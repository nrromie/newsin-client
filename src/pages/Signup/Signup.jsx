import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMG_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Signup = () => {
    const { createUser } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        // upload image to imgbb and then get an url
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            createUser(data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: data.displayName,
                        photoURL: res.data.data.display_url,
                    })
                    const userInfo = {
                        photoURL: res.data.data.display_url,
                        email: data.email,
                        displayName: data.displayName,
                        isPremium: null,
                        isAdmin: false
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log('user added to the database')
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            }
                        })
                        .catch(error => console.log(error))
                })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign up for an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="-space-y-px">
                        <div>
                            <div className="mt-1 flex items-center space-x-4">
                                <label htmlFor="photo" className="text-white">
                                    Choose Photo
                                </label>
                                <input
                                    {...register("photo", { required: true })}
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    autoComplete="photo"
                                    required
                                    className="file-input file-input-bordered w-full"
                                />
                            </div>
                            {errors.photo && <p className="text-red-500 text-sm mt-1">Profile Photo is required</p>}
                        </div>
                    </div>
                    <div className="rounded-md rounded-t shadow-sm -space-y-px">
                        <div>
                            <label className="sr-only text-white">Name</label>
                            <input
                                {...register("displayName", { required: true })}
                                type="text"
                                autoComplete="displayName"
                                required
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                        </div>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label className="sr-only text-white">Email</label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                        </div>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label className="sr-only text-white">Password</label>
                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,12}$/,
                                    maxLength: 12
                                })}
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="password"
                                autoComplete="newpassword"
                            />
                            {errors.password?.type === "minLength" && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters.</p>}
                            {errors.password?.type === "maxLength" && <p className="text-red-500 text-sm mt-1">Password must be within 12 characters</p>}
                            {errors.password?.type === "pattern" && <p className="text-red-500 text-sm mt-1">Password must contain one uppercase, one number, and a special character.</p>}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="text-white">Already a member? <Link to={"/login"} className="text-indigo-400 hover:underline">Login</Link></p>
                </form>
            </div>
        </div>

    );
};

export default Signup;