import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ArticleDetails = () => {
    const { articleId } = useParams();
    const [loading, setLoading] = useState(true)
    const [article, setArticle] = useState(null);
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axiosSecure.get(`/articles/${articleId}`);
                setArticle(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchArticle();
    }, []);

    if (loading) {
        return <Loading />;
    }

    const { title, image, publisher, description, longDescription, tags, view, isPremium } = article

    return (
        <div className="max-w-3xl mx-auto p-4 bg-gray-800 text-white">
            <h1 className="text-3xl font-semibold mb-4">{title}</h1>
            <img className="w-full h-72 object-cover mb-4 rounded-md" src={image} alt={title} />

            <p className="text-gray-400 mb-2">By {publisher}</p>
            <p className="text-gray-300 mb-4">{description}</p>

            <ul className="my-4 flex gap-6">
                {tags.map((tag, i) => (
                    <li key={i} className="text-gray-400">#{tag}</li>
                ))}
            </ul>

            <p className="text-gray-100">{longDescription}</p>

            <div className="mt-4">
                <p className="text-sm text-gray-500">Views: <span className='text-white'>{view}</span></p>
                {isPremium && <p className="text-sm text-yellow-500">Premium Article</p>}
            </div>
        </div>
    );
};

export default ArticleDetails;