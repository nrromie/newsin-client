import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';


const AllArticles = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');

    const getArticles = async ({ pageParam = 1 }) => {
        try {
            const res = await axiosPublic.get(`/articles?page=${pageParam}&title=${searchTerm}`);
            return { articles: res.data.articles, prevOffset: pageParam };
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    };

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['articles', { searchTerm }], // Include searchTerm in the queryKey
        queryFn: getArticles,
        getNextPageParam: (lastPage) => {
            if (lastPage.prevOffset * 5 >= lastPage.articlesCount) {
                return false;
            }
            return lastPage.prevOffset + 1;
        },
    });

    const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.articles];
    }, []);

    return (
        <div>
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md"
                />
            </div>
            <InfiniteScroll
                dataLength={articles ? articles.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loading={<Loading />}
            >
                <div className="my-10 w-11/12 mx-auto">
                    {articles &&
                        articles.map((article, idx) => {
                            return <ArticleCard article={article} key={idx} />;
                        })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default AllArticles;