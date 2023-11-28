import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';
import Loading from '../../../components/Loading/Loading';
import { Link } from 'react-router-dom';

const Trending = () => {
    const AutoplaySlider = withAutoplay(AwesomeSlider);

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true)
    const [articles, setArticles] = useState([])


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosPublic.get('/trending');
                setArticles(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <div className='sm:w-11/12 mx-auto mt-6 mb-20'>
            <h1 className='text-4xl py-3 font-semibold text-violet-600'>Trending</h1>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={true}
                interval={3000}
                className="h-72"
            >
                {articles.map((article, i) => (
                    <div key={i} className="sm:w-10/12 h-full trending-news-card relative overflow-hidden rounded-lg shadow-lg">
                        <img src={article.image} alt={article.title} className="object-cover w-full h-full" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h2 className="text-white text-xl md:text-2xl font-bold">{article.title}</h2>
                            <p className="text-gray-300">Published by {article.publisher}</p>
                            <Link to={`article/${article._id}`} className="text-blue-500 hover:underline mt-2 block">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </AutoplaySlider>
        </div>
    );
};

export default Trending;