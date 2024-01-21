import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AddArticle from "../pages/AddArticle/AddArticle";
import AllArticles from "../pages/AllArticles/AllArticles";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import Signup from "../pages/Signup/Signup";
import Subscription from "../pages/Subscription/Subscription/Subscription";
import Payment from "../pages/Subscription/Payment/Payment";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import Login from "../pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import Analytics from "../pages/Dashboard/Analytics/Analytics";
import AllUser from "../pages/Dashboard/AllUsers/AllUser";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import MyArticles from "../pages/MyArticles/MyArticles";
import AdAllArticles from "../pages/Dashboard/AdAllArticles/AdAllArticles";
import AdminArticleDetails from "../pages/Dashboard/AdAllArticles/AdminArticleDetails/AdminArticleDetails";
import MyArticleDetails from "../pages/MyArticles/MyArticleDetails/MyArticleDetails";
import MyProfile from "../pages/MyProfile/MyProfile";
import UpdateArticle from "../pages/MyArticles/UpdateArticle/UpdateArticle"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "addarticle",
                element: <PrivateRoutes><AddArticle /></PrivateRoutes>
            },
            {
                path: "allarticles",
                element: <AllArticles />
            },
            {
                path: "/article/:articleId",
                element: <PrivateRoutes><ArticleDetails /></PrivateRoutes>
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "subscription",
                element: <PrivateRoutes><Subscription /></PrivateRoutes>
            },
            {
                path: "payment/:plansId",
                element: <PrivateRoutes><Payment /></PrivateRoutes>
            },
            {
                path: "premiumarticles",
                element: <PrivateRoutes><PremiumArticles></PremiumArticles></PrivateRoutes>
            },
            {
                path: "myarticles",
                element: <PrivateRoutes><MyArticles /></PrivateRoutes>,
            },
            {
                path: "myarticles/update/:id",
                element: <PrivateRoutes><UpdateArticle /></PrivateRoutes>,
            },
            {
                path: "myarticledetails/:articleId",
                element: <PrivateRoutes><MyArticleDetails /></PrivateRoutes>
            },
            {
                path: "myprofile",
                element: <PrivateRoutes><MyProfile /></PrivateRoutes>
            },
            {
                path: "/dashboard",
                element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
                children: [
                    {
                        path: "/dashboard",
                        element: <Analytics />
                    },
                    {
                        path: "addpublisher",
                        element: <AddPublisher />
                    },
                    {
                        path: "alluser",
                        element: <AllUser />
                    },
                    {
                        path: "adallarticles",
                        element: <AdAllArticles />
                    },
                    {
                        path: "adminarticledetails/:articleId",
                        element: <AdminArticleDetails />
                    }
                ]
            }
        ],
    },
]);

export default router;