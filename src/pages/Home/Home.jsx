import Banner from "../../components/Banner/Banner";
import Trending from "./Trending/Trending"
import Publishers from "./Publishers/Publishers";
import UserStats from "./UserStats/UserStats";
import Footer from "./Footer/Footer";
import SubsPlan from "../../components/SubsPlan/SubsPlan";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Trending></Trending>
            <Publishers></Publishers>
            <UserStats />
            <SubsPlan />
            <Footer />
        </div>
    );
};

export default Home;