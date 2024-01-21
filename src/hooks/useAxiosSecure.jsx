import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

//https://newsin-server.vercel.app/

const axiosSecure = axios.create({
    baseURL: 'https://newsin-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                logOut()
                    .then(() => {
                        navigate("/login")
                    })
            }
        }
        )
    }, [])
    return axiosSecure;
};

export default useAxiosSecure;