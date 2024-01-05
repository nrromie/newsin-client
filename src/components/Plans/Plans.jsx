import { Link } from "react-router-dom";

const Plans = () => {

    return (
        <>
            <div className="bg-black border-red-400 border-4 rounded-xl p-6 mt-4">
                <div className="text-center">
                    <h1 className="text-4xl text-red-400 font-semibold">Starter</h1>
                    <h1 className="text-sm text-gray-400">1 Minute</h1>
                </div>
                <ul className="mt-4 text-center">
                    <li className="text-gray-400">Access to Premium Articles</li>
                    <li className="text-gray-400">Instant Access</li>
                    <li className="text-gray-400">Affordable Pricing</li>
                </ul>
                <h1 className="text-green-400 text-5xl font-bold py-4 text-center">$0.99</h1>
                <Link to={`/payment/${1}`} className="btn bg-red-500 text-white font-semibold w-full hover:bg-red-700 mt-6">Buy Now</Link>
            </div>

            <div className="bg-black border-blue-400 border-4 rounded-xl p-6 mt-2">
                <div className="text-center">
                    <h1 className="text-4xl text-blue-400 font-semibold">Standard</h1>
                    <h1 className="text-sm text-gray-400">5 Days</h1>
                </div>
                <ul className="mt-4 text-center">
                    <li className="text-gray-400">Access to Premium Articles</li>
                    <li className="text-gray-400">Instant Access</li>
                    <li className="text-gray-400">Affordable Pricing</li>
                </ul>
                <h1 className="text-green-400 text-5xl font-bold py-4 text-center">$7</h1>
                <Link to={`/payment/${2}`} className="btn bg-blue-500 text-white font-semibold w-full hover:bg-blue-700 mt-6">Buy Now</Link>
            </div>

            <div className="bg-black border-violet-400 border-4 rounded-xl p-6">
                <div className="text-center">
                    <h1 className="text-4xl text-violet-400 font-semibold">Premium</h1>
                    <h1 className="text-sm text-gray-400">10 Days</h1>
                </div>
                <ul className="mt-4 text-center">
                    <li className="text-gray-400">Access to Premium Articles</li>
                    <li className="text-gray-400">Instant Access</li>
                    <li className="text-gray-400">Affordable Pricing</li>
                </ul>
                <h1 className="text-green-400 text-5xl font-bold py-4 text-center">$10</h1>
                <Link to={`/payment/${3}`} className="btn bg-violet-500 text-white font-semibold w-full hover:bg-violet-700 mt-6">Buy Now</Link>
            </div>
        </>
    );
};

export default Plans;