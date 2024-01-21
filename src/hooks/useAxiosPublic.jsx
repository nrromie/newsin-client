import axios from "axios";

//https://newsin-server.vercel.app/

const axiosPublic = axios.create({
    baseURL: 'https://newsin-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;