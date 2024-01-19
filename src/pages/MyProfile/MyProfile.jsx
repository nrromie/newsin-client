import Loading from "../../components/Loading/Loading";
import useLoadUserData from "../../hooks/useLoadUserData";

const MyProfile = () => {
    const [userData] = useLoadUserData();

    if (!userData) {
        return <Loading />
    }

    return (
        <div className="profile-page bg-gray-800 text-white w-11/12 mx-auto mt-20 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">{userData.displayName}'s Profile</h2>
            <div className="flex flex-col items-center">
                <img src={userData.photoURL} alt={userData.displayName} className="w-64 h-64 rounded-full mb-4 border-4 border-gray-600 object-cover" />

                <div>
                    <p className="text-lg font-semibold mb-2">Email: <span className="font-normal">{userData.email}</span></p>

                    <p className="text-lg font-semibold mb-2">Subscription Status: <span className="font-normal">{userData.isPremium ? 'Premium' : 'Free'}</span></p>

                    {userData.expires && (
                        <>
                            <p className="text-lg font-semibold mb-2">Subscription Expiry: <span className="font-normal">{userData.expires}</span></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;