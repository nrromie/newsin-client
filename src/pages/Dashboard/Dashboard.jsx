import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex justify-between items-start w-full">
            <div>
                <Sidebar />
            </div>
            <div className=" w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;