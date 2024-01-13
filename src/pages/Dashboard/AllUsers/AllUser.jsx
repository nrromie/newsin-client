import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllUser = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get('/users');
                setUsers(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="overflow-x-scroll">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Display Name</th>
                        <th>Is Premium</th>
                        <th>Admin</th>
                        <th>Profile Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.displayName}</td>
                            <td>{user.isPremium ? user.isPremium : "Not Premium"}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;