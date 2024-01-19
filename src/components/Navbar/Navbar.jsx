import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useLoadUserData from "../../hooks/useLoadUserData";
import { FaCrown } from "react-icons/fa6";

const Navbar = () => {
    const [userData] = useLoadUserData()
    const { user, logOut } = useContext(AuthContext)



    const linkStyle = ({ isActive, isPending }) =>
        isActive ? "text-violet-400 hover:text-violet-700" : "hover:text-violet-700"

    const premStyle = ({ isActive, isPending }) =>
        isActive ? "text-yellow-500 flex flex-col-reverse justify-center items-center gap-0 hover:text-yellow-600" : "text-yellow-500 flex items-center gap-1 hover:text-yellow-600"


    const navlinks = <>
        <li><NavLink className={linkStyle} to={'/'}>Home</NavLink></li>
        <li><NavLink className={linkStyle} to={'allarticles'}>All Articles</NavLink></li>
        {user && <>
            <li><NavLink className={linkStyle} to={'addarticle'}>Add Article</NavLink></li>
            <li><NavLink className={linkStyle} to={'subscription'}>Subscription</NavLink></li>
            <li><NavLink className={linkStyle} to={'myarticles'}>My Articles</NavLink></li>
            {userData?.isPremium && <li><NavLink className={premStyle} to={'premiumarticles'}>Premium Articles <FaCrown /></NavLink></li>}
            {userData?.isAdmin && <li><NavLink className={linkStyle} to={'dashboard'}>Dashboard</NavLink></li>}
        </>}
    </>


    return (
        <div className="bg-slate-800 w-full text-white shadow-md">
            <div className="navbar w-11/12 h-[10vh] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-slate-800">
                            {navlinks}
                        </ul>
                    </div>
                    <Link to={'/'} className="flex items-center h-full">
                        <img className="h-12" src="./images/newsin.svg" alt="logo" />
                        <h1 className="btn btn-ghost text-xl">NewsIn</h1>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal flex gap-6 px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="flex gap-6">
                                <button onClick={logOut}>Log out</button>
                                <Link to={"/myprofile"}>
                                    <img className="w-12 h-12 object-cover rounded-full" src={user?.photoURL} alt="User Photo" />
                                </Link>
                            </div>
                            :
                            <div className="flex gap-6">
                                <Link className="btn hidden md:flex lg:flex" to={'signup'}>Signup</Link>
                                <Link className="btn" to={'login'}>Login</Link>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;