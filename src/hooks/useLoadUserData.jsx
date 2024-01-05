import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";

const useLoadUserData = () => {
    const [userData, setUserData] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useContext(AuthContext);

    const fetchUser = async () => {
        try {
            if (user) {
                const response = await axiosPublic.get(`/user/${user.email}`);
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