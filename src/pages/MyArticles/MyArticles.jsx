import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

const MyArticles = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();

    const { isPending, error, data: articles } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axiosPublic.get(`/myarticles/${user.email}`).then((res) => res.data),
    });

    if (isPending) return <Loading />;

    if (error) {
        console.error(error);
    }

    return (
        <div className="my-10 w-11/12 mx-auto">

            {articles.length === 0 ? (
                <div className="h-[90vh] flex flex-col justify-center items-center gap-6">
                    <p className="text-gray-500 text-lg font-semibold">
                        You haven't published any articles yet.
                    </p>
                    <p className="text-gray-400 mt-2">
                        Start sharing your knowledge and experiences with the community!
                    </p>
                    <Link to={"/addarticle"} className="btn text-white bg-violet-500 hover:bg-violet-700">Add Articles</Link>
                </div>
            ) : (
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
                                        {
                                            article.isApproved ? "Approved" : article.declineMessage ? "Declined" : "Pending"
                                        }
                                    </td>
                                    <td>{article.isPremium ? "true" : "false"}</td>
                                    <th>
                                        <Link to={`/myarticledetails/${article._id}`} className="btn btn-ghost btn-xs">details</Link>
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
            )}

        </div>
    );
};

export default MyArticles;