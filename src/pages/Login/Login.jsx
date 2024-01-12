import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {

    const { signin } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        signin(data.email, data.password)
            .then((res) => {
                console.log('Login successful:', res);
                navigate('/');
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Log in</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label className="sr-only text-white">Email</label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                        </div>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label className="sr-only text-white">Password</label>
                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,12}$/,
                                    maxLength: 12
                                })}
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="password"
                                autoComplete="newpassword"
                            />
                            {errors.password?.type === "minLength" && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters.</p>}
                            {errors.password?.type === "maxLength" && <p className="text-red-500 text-sm mt-1">Password must be within 12 characters</p>}
                            {errors.password?.type === "pattern" && <p className="text-red-500 text-sm mt-1">Password must contain one uppercase, one number, and a special character.</p>}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                    <p className="text-white">Don't have an account? <Link to={"/signup"} className="text-indigo-400 hover:underline">Create one now</Link></p>
                </form>
            </div>
        </div>

    );
};

export default Login;