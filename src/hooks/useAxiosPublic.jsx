import axios from "axios";

//https://newsin-server.vercel.app/

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;