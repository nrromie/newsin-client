import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdAllArticles = () => {

    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData', currentPage],
        queryFn: () =>
            axiosPublic.get(`/adminallarticles?page=${currentPage}`).then((res) => res.data),
    });

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isPending) return <Loading />;

    if (error) {
        console.error(error);
    }

    const { articles, articlesCount, totalPages } = data;

    return (
        <div className="my-10 w-11/12 mx-auto">

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Premium</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={article.image} alt={article.title} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">
                                        {article.title}
                                    </div>
                                </td>
                                <td>
                                    {article.isApproved ? "true" : "false"}
                                </td>
                                <td>{article.isPremium ? "true" : "false"}</td>
                                <th>
                                    <Link to={`/dashboard/adminarticledetails/${article._id}`} className="btn btn-ghost btn-xs">details</Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Premium</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>

            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`btn btn-ghost ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    Previous
                </button>
                <div className="mx-4 text-lg font-bold">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`btn btn-ghost ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    Next
                </button>
            </div>


        </div>
    );
};

export default AdAllArticles;