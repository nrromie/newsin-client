import { Link } from "react-router-dom";
import Globe from "./Globe/Globe";
const Banner = () => {
    return (
        <div className="bg-[url(/images/city.jpg)] bg-cover bg-center h-[90vh] ">
            <div className="h-full w-11/12 mx-auto flex flex-col md:flex-row lg:flex-row justify-center md:justify-between lg:justify-between items-center gap-6">
                <div className="text-white w-full md:w-[50%] lg:w-[50%]">
                    <p className="text-xl lg:text-2xl font-medium">Stay Informed, Stay Ahead</p>
                    <h1 className="text-3xl lg:text-5xl mt-2 font-bold">Uncovering Stories That Matter</h1>
                    <Link to={"allarticles"} className="btn text-white bg-violet-700 hover:bg-violet-900 px-4 py-2 rounded-3xl font-semibold mt-6">Top Stories</Link>
                </div>
                <div>
                    <Globe></Globe>
                </div>
            </div>
        </div>
    );
};

export default Banner;