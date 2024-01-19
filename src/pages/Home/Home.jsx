import Banner from "./Banner/Banner";
import Trending from "./Trending/Trending"
import Publishers from "./Publishers/Publishers";
import UserStats from "./UserStats/UserStats";
import Footer from "./Footer/Footer";
import SubsPlan from "../../components/SubsPlan/SubsPlan";
import Weather from "./Weather/Weather";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Trending></Trending>
            <Publishers></Publishers>
            <UserStats />
            <SubsPlan />
            <Weather />
            <Footer />
        </div>
    );
};

export default Home;