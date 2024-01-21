import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyArticleDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchArticle = async () => {
        try {
            const response = await axiosSecure.get(`/articles/${articleId}`);
            setArticle(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching article:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [axiosSecure, articleId]);

    const handleDelete = async () => {
        // Show a confirmation dialog before deleting
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this article!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            // Delete the article
            try {
                await axiosSecure.delete(`/articles/${articleId}`);
                Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
                navigate('/myarticles')

            } catch (error) {
                console.error('Error deleting article:', error);
                Swal.fire('Error', 'Failed to delete the article.', 'error');
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="my-10 w-11/12 mx-auto">
            <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>

            <div className="flex items-center space-x-4 mb-4">
                <img src={article.image} alt={article.title} className="w-24 h-24 object-cover rounded-md" />
                <div>
                    <p className="font-bold text-lg">{article.publisher}</p>
                    <p className="text-gray-500">{article.tags.join(', ')}</p>
                </div>
            </div>

            <div className="text-gray-700 mb-4">
                <p>{article.longDescription}</p>
            </div>

            <div className="mb-4">
                {article.isApproved ? (
                    <span className="text-green-500 font-bold">Approved</span>
                ) : article.declineMessage ? (
                    <span className="text-red-500 font-bold">Declined</span>
                ) : (
                    <span className="text-yellow-500 font-bold">Pending</span>
                )}
            </div>

            <div className="mb-4">
                {!article.isApproved && article.declineMessage && (
                    <p className="text-red-500">{article.declineMessage}</p>
                )}
            </div>

            {article.isPremium && (
                <div className="mb-4">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center">
                        <FaCheck className="mr-1" />
                        Premium
                    </span>
                </div>
            )}

            <div className="flex items-center space-x-4">
                <Link to={`/myarticles/update/${article._id}`} className="btn btn-primary" title="Update">
                    <FaEdit />
                </Link>
                <button onClick={handleDelete} className="btn btn-danger" title="Delete">
                    <FaTrash />
                </button>
            </div>

        </div>
    );
};

export default MyArticleDetails;