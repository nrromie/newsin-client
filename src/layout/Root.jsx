import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SubscriptionPopup from "../components/SubscriptionPopup/SubscriptionPopup";

const Root = () => {
    return (
        <div className="relative max-w-[1440px] mx-auto">
            <div className="w-full max-w-[1440px] fixed z-50 top-0">
                <Navbar></Navbar>
            </div>
            <div className="mt-[10vh]">
                <Outlet></Outlet>
                <SubscriptionPopup />
            </div>
        </div>
    );
};

export default Root;