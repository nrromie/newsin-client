import { FaCrown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useLoadUserData from "../../hooks/useLoadUserData";

const ArticleCard = ({ article }) => {
    const [userData] = useLoadUserData();
    const { image, title, description, publisher, isPremium } = article

    const detailsLinkDisabled = isPremium && !userData?.isPremium && !userData;


    return (
        <div className={`relative bg-gray-800 text-white max-w-[800px] mx-auto p-4 rounded-md shadow-md mb-4 ${isPremium && "border-yellow-500 border-2"}`}>
            {isPremium && <div className="absolute right-0 top-0 p-6 text-center text-3xl text-yellow-600">
                <FaCrown />
            </div>}
            <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded-md" />
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-300 mb-4">{description}</p>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Publisher: {publisher}</p>
                {detailsLinkDisabled ? (
                    <div>
                        <Link to={"/subscription"} className="bg-yellow-500 font-semibold px-3 py-1 mr-2 rounded-md">Go Premium</Link>
                        <span className="text-gray-400 cursor-not-allowed">Details</span>
                    </div>
                ) : (
                    <Link to={`/article/${article._id}`} className="text-blue-400 hover:underline">Details</Link>
                )}
            </div>
        </div>
    );
};

export default ArticleCard;