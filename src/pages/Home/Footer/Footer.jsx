import { Link } from "react-router-dom";
import { FaSquareXTwitter, FaYoutube, FaFacebookF, FaPhone, FaLocationDot, FaEnvelope } from "react-icons/fa6";
import Map from "./Map/Map";

const Footer = () => {
    const position = [51.505, -0.09]

    return (
        <div className="bg-slate-800 p-10">
            <footer className="footer w-11/12 mx-auto">
                <aside>
                    <img src="/images/newsin.svg" alt="Logo" className="h-24 w-24" />
                    <p>Newsin<br />Providing reliable news since 1992</p>
                </aside>
                <nav>
                    <header className="footer-title">Social</header>
                    <div className="grid grid-flow-col text-2xl gap-4">
                        <Link className="hover:text-violet-500"><FaSquareXTwitter /></Link>
                        <Link className="hover:text-violet-500"><FaFacebookF /></Link>
                        <Link className="hover:text-violet-500"><FaYoutube /></Link>
                    </div>
                    <header className="footer-title mt-6">Contact</header>
                    <div className="flex flex-col gap-4">
                        <p className="flex items-center gap-6">
                            <FaPhone />
                            <span>123456789</span>
                        </p>
                        <p className="flex items-center gap-6">
                            <FaEnvelope />
                            <span>contact@business.com</span>
                        </p>
                    </div>
                </nav>


                <div>
                    <header className="footer-title">Contact</header>
                    <p className="flex items-center gap-6">
                        <FaLocationDot />
                        <span>Padua Bazar, Gunabati Road, Cumilla</span>
                    </p>
                    <div className="h-40 w-full my-4">
                        <Map />
                    </div>
                </div>

            </footer>
            <footer className="footer footer-center p-4 bg-slate-900 mt-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Newsin Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;