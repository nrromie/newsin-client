import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import Loading from "../../components/Loading/Loading";

const PremiumArticles = () => {
    const axiosPublic = useAxiosPublic();
    const { isPending, error, data: articles } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axiosPublic.get('/premium-articles').then((res) => res.data),
    });


    if (isPending) return <Loading />

    if (error) { console.error(error) }


    return (
        <div className="my-10 w-11/12 mx-auto">
            {articles &&
                articles.map((article, idx) => {
                    return <ArticleCard article={article} key={idx} />;
                })}
        </div>
    );
};

export default PremiumArticles;