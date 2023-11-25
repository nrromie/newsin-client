import { Link } from 'react-router-dom';
import { MdDashboard, MdArticle, MdAdd, MdAnalytics } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
    return (
        <nav className="bg-gray-800 h-screen w-60 shadow py-6">
            <div className="flex items-center justify-center mt-8 text-white text-4xl">
                <MdDashboard />
            </div>
            <div className="mt-10">
                <Link to="/dashboard" className="flex items-center text-white p-4 hover:bg-gray-700">
                    <MdAnalytics />
                    <span className="ml-2">Dashboard</span>
                </Link>
                <Link to="alluser" className="flex items-center text-white p-4 hover:bg-gray-700">
                    <FaUsers />
                    <span className="ml-2">All Users</span>
                </Link>
                <Link to="/analytics" className="flex items-center text-white p-4 hover:bg-gray-700">
                    <MdArticle />
                    <span className="ml-2">All Articles</span>
                </Link>
                <Link to="addpublisher" className="flex items-center text-white p-4 hover:bg-gray-700">
                    <MdAdd />
                    <span className="ml-2">Add Publisher</span>
                </Link>
            </div>
        </nav>
    );
};

export default Sidebar;