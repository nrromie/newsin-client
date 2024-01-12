import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';
import Select from 'react-select';

const image_hosting_key = import.meta.env.VITE_IMG_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticle = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [publishers, setPublishers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await axiosPublic.get('/publishers');
                setPublishers(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchPublishers();
    }, []);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = async (data) => {
        setSending(true)
        const imageFile = { image: data.image[0] }
        console.log(imageFile)
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            try {
                data.tags = selectedOption.map(sOp => sOp.label);
                data.view = 0;
                data.isApproved = false;
                data.isPremium = false;
                data.image = res.data.data.display_url

                const response = await axiosPublic.post('/article', data);
                if (response.data.insertedId) {
                    reset();
                    setSending(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Article added successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Error submitting the form:', error);
                setSending(false)
            }
        }
    };

    const options = [
        { value: 'politics', label: 'Politics' },
        { value: 'world-news', label: 'World News' },
        { value: 'technology', label: 'Technology' },
        { value: 'science', label: 'Science' },
        { value: 'health', label: 'Health' },
        { value: 'business', label: 'Business' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'sports', label: 'Sports' },
        { value: 'environment', label: 'Environment' },
        { value: 'education', label: 'Education' },
        { value: 'culture', label: 'Culture' },
        { value: 'opinion', label: 'Opinion' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'travel', label: 'Travel' },
        { value: 'breaking-news', label: 'Breaking News' },
    ];


    if (loading || sending) {
        return <Loading />
    }

    return (
        <div className="max-w-2xl mx-auto my-20 p-8 bg-slate-800 rounded shadow-md text-white">
            <h2 className="text-2xl font-bold mb-4">Add New Article</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1" htmlFor="title">
                        Title:
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        aria-invalid={errors.title ? 'true' : 'false'}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1" htmlFor="image">
                        Image:
                    </label>
                    <input
                        type="file"
                        {...register('image', { required: 'Image is required' })}
                        className="file-input w-full"
                        aria-invalid={errors.image ? 'true' : 'false'}
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                        Description:
                    </label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        aria-invalid={errors.description ? 'true' : 'false'}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <label className="block text-sm font-semibold mb-1 mt-4">Long Description:</label>
                <textarea
                    {...register('longDescription', { required: 'Long Description is required' })}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    aria-invalid={errors.longDescription ? 'true' : 'false'}
                />
                {errors.longDescription && <p role="alert">{errors.longDescription.message}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1 mt-4">
                        Writer Email
                    </label>
                    <input
                        defaultValue={user?.email}
                        type="text"
                        {...register('writerEmail', { required: 'Title is required' })}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        aria-invalid={errors.writerEmail ? 'true' : 'false'}
                        readOnly
                    />
                    {errors.writerEmail && <p className="text-red-500 text-sm mt-1">{errors.title.writerEmail}</p>}
                </div>

                <label className="block text-sm font-semibold mb-1 mt-4">Tags (comma-separated):</label>

                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    isMulti={true}
                    isSearchable={true}
                    required
                    className="w-full text-black border border-gray-300 bg-gray-800 p-2 rounded-md"
                />


                <label className="block text-sm font-semibold mb-1 mt-4">Publisher:</label>
                <select
                    {...register('publisher', { required: 'Publisher is required' })}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    aria-invalid={errors.publisher ? 'true' : 'false'}
                >
                    <option value="">Select a Publisher</option>
                    {publishers.map((publisher) => (
                        <option key={publisher._id} value={publisher.name}>
                            {publisher.name}
                        </option>
                    ))}
                </select>
                {errors.publisher && <p role="alert">{errors.publisher.message}</p>}

                <button
                    type="submit"
                    className="bg-violet-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-violet-600 focus:outline-none focus:shadow-outline-blue w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddArticle;