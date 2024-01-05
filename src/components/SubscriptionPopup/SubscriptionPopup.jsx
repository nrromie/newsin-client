import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Plans from "../Plans/Plans";
import useLoadUserData from "../../hooks/useLoadUserData";

const SubscriptionPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userData] = useLoadUserData();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowPopup(true);
        }, 10000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            { !userData?.isPremium &&showPopup && (
                <div className="fixed inset-0 z-[990] flex items-center justify-center bg-black bg-opacity-60">
                    <button onClick={handleClosePopup} className="absolute top-4 lg:top-[10vh] right-[10vw] p-2 text-3xl text-white rounded-md z-[999]">
                        <MdOutlineCancel />
                    </button>
                    <div className="relative text-white rounded-md grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 overflow-auto max-h-[80vh] gap-6 w-3/4">
                        <Plans></Plans>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionPopup;