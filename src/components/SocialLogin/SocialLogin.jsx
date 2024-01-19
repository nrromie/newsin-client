import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const location = useLocation()
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const email = result.user.email;
                const displayName = result.user.displayName;
                const photoURL = result.user.photoURL;
                const userInfo = {
                    email,
                    photoURL,
                    displayName,
                    isPremium: null,
                    isAdmin: false
                };

                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        if (res.data.insertedId) {
                            console.log('user added to the database');
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    })
                    .catch((error) => console.log(error));
                navigate(location?.state ? location.state : '/');
            });
    };

    return (
        <div>
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                <p className="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="p-3 rounded-sm text-2xl">
                    <FcGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;