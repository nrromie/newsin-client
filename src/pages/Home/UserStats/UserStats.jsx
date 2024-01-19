import CountUp from 'react-countup';
import Loading from '../../../components/Loading/Loading';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';

const UserStats = () => {

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [userNums, setUserNums] = useState([]);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await axiosPublic.get('/userstats');
                setUserNums(response.data);
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
        <div className='flex justify-center items-center py-10'>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 shadow text-center">

                <div className="px-5">
                    <div className="stat-title text-2xl">Total Users</div>
                    <div className="stat-value text-9xl">
                        <CountUp end={userNums.totalUsers} enableScrollSpy={true} />
                    </div>
                </div>

                <div className="border-0 lg:border-x-2 px-5 border-gray-300">
                    <div className="stat-title text-2xl">Normal Users</div>
                    <div className="stat-value text-9xl">
                        <CountUp end={userNums.totalUsers - userNums.premiumUsers} enableScrollSpy={true} />
                    </div>
                </div>

                <div className="px-5">
                    <div className="stat-title text-2xl">Premium Users</div>
                    <div className="stat-value text-9xl text-violet-500">
                        <CountUp end={userNums.premiumUsers} enableScrollSpy={true} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserStats;