import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useLoadUserData = () => {
    const [userData, setUserData] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);

    const fetchUser = async () => {
        try {
            if (user) {
                const response = await axiosSecure.get(`/user/${user.email}`);
                setUserData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [user]);

    return [userData, fetchUser];
};

export default useLoadUserData;