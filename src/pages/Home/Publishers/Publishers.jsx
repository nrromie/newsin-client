import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";

const Publishers = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await axiosPublic.get('/publishers');
                setPublishers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchPublishers();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="w-11/12 mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Our Partners</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishers.map((publisher, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg shadow-md p-6 text-white transition duration-300 hover:bg-gray-700">
                        <img
                            src={publisher.logoURL}
                            alt={publisher.name}
                            className="w-28 h-28 object-contain mx-auto mb-4 rounded-full border-4 border-gray-900"
                        />
                        <h1 className="text-2xl font-extrabold text-gray-300 mb-2">{publisher.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Publishers;