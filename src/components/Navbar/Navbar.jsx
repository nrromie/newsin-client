import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useLoadUserData from "../../hooks/useLoadUserData";
import { FaBars, FaCrown, FaXmark } from "react-icons/fa6";

const Navbar = () => {
    const [userData] = useLoadUserData()
    const { user, logOut } = useContext(AuthContext)
    const [isMenuOpen, setMenuOpen] = useState(false);



    const linkStyle = ({ isActive, isPending }) =>
        isActive ? "text-violet-400 hover:text-violet-700" : "hover:text-violet-700"

    const premStyle = ({ isActive, isPending }) =>
        isActive ? "text-yellow-500 flex flex-col-reverse justify-center items-center gap-0 hover:text-yellow-600" : "text-yellow-500 flex items-center gap-1 hover:text-yellow-600"

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };


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
                    <Link to={'/'} className="flex items-center h-full">
                        <img className="h-12" src="./images/newsin.svg" alt="logo" />
                        <h1 className="font-bold text-xl px-4">NewsIn</h1>
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
                            <div className="flex justify-center items-center gap-6">
                                <button className="hidden md:inline-flex" onClick={logOut}>Log out</button>
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

                    <div className="lg:hidden">
                        <button
                            className="pl-6 text-xl flex justify-center items-center hover:text-violet-500"
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            {
                                isMenuOpen ? <FaXmark /> : <FaBars />
                            }
                        </button>
                    </div>
                    <div
                        className={`lg:hidden fixed inset-0 z-30 transition-opacity ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        onClick={toggleMenu}
                    ></div>
                    <div
                        className={`lg:hidden mt-[10vh] z-50 fixed top-0 right-0 h-full w-64 bg-slate-800 transform transition-transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <ul className="menu-vertical p-4">{navlinks}
                        <li className="flex md:hidden lg:hidden"><button onClick={logOut}>Log out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;