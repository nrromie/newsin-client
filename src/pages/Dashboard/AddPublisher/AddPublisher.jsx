import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMG_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        // upload logo to imgbb and then get an url
        const imageFile = { image: data.logo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const publisher = {
                logoURL: res.data.data.display_url,
                name: data.name
            }
            axiosPublic.post('/newpublisher', publisher)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log('Publisher successfully added')
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Publisher added successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => console.log(error))
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-8">
            <h2 className="text-3xl font-semibold mb-4">Add Publisher</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Publisher Logo</label>
                    <input
                        type="file"
                        placeholder='Logo'
                        {...register("logo", { required: "Logo is required" })}
                        className="file-input"
                    />
                    {errors.logo && <p className="text-red-500 mt-1">{errors.logo.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Publisher Name</label>
                    <input
                        type="text"
                        placeholder='Name'
                        {...register("name", { required: "Publisher name is required" })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Add Publisher
                </button>
            </form>
        </div>
    );
};

export default AddPublisher;