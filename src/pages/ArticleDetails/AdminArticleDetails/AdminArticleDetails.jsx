import { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loading from '../../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";

const AdminArticleDetails = ({ match }) => {
    const axiosPublic = useAxiosPublic();
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchArticle = async () => {
        try {
            const response = await axiosPublic.get(`/articles/${articleId}`);
            setArticle(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching article:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [axiosPublic, articleId]);


    const handleApprove = async () => {
        try {
            const res = await axiosPublic.patch(`/approve-article/${articleId}`);

            if (res.data.success) {
                fetchArticle()
            }
        } catch (error) {
            console.error('Error approving article:', error);
        }
    };

    const handleTogglePremium = async () => {
        try {
            const res = await axiosPublic.patch(`/toggle-premium/${articleId}`);
            console.log(res)
            if (res.data.success) {
                fetchArticle()
            }
        } catch (error) {
            console.error('Error toggling premium status:', error);
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

            <div className="text-gray-700">
                <p>{article.longDescription}</p>
            </div>

            <div className="mt-6 flex gap-6">
                {article.isApproved ? (
                    <span className="text-green-500 font-bold">Approved</span>
                ) : (
                    <button onClick={handleApprove} className="btn btn-primary">
                        Approve
                    </button>
                )}

                <button onClick={handleTogglePremium} className={`btn ${article.isPremium ? 'btn-warning' : 'btn-secondary'}`}>
                    Toggle Premium {article.isPremium && <FaCheck className="ml-1" />}
                </button>
            </div>

        </div>
    );
};

export default AdminArticleDetails;