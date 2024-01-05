import useLoadUserData from "../../hooks/useLoadUserData";
import Plans from "../Plans/Plans";

const SubsPlan = () => {

    const [userData] = useLoadUserData();
    return (
        <div className="w-11/12 mx-auto py-8">
            {
                userData?.isPremium ? <div className="bg-gray-800 text-white p-8 rounded-md shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Thank You for Your Support!</h1>
                    <p className="text-lg mb-6">Your subscription will expire on: <span className="text-yellow-500">{userData.expires}</span></p>
                    <p className="text-sm text-gray-400">We appreciate your continued support. If you have any questions or need assistance, feel free to contact our support team.</p>
                </div>
                    : <div>
                        <h1 className="text-5xl font-bold">Plans</h1>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            <Plans></Plans>
                        </div>
                    </div>
            }

        </div>
    );
};

export default SubsPlan;