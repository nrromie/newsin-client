import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

const MyArticles = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const { isPending, error, data: articles } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axiosPublic.get(`/myarticles/${user.email}`).then((res) => res.data),
    });


    if (isPending) return <Loading />

    if (error) { console.error(error) }

    return (
        <div className="mt-20 w-11/12 mx-auto">
            {articles &&
                articles.map((article, idx) => {
                    return <ArticleCard article={article} key={idx} />;
                })}
        </div>
    );
};

export default MyArticles;