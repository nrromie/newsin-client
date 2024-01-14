import { Chart } from "react-google-charts";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const Analytics = () => {

    const axiosPublic = useAxiosPublic();
    const { isPending, error, data: pubStats } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axiosPublic.get('/publication-stats').then((res) => res.data),
    });

    if (isPending) return <Loading />

    if (error) { console.error(error) }

    const data = [
        ["Publication", "Number of Articles"],
        ...pubStats.map(({ publication, articleCount }) => [publication, articleCount]),
    ];

    const options = {
        title: "Articles of publishers",
    };

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default Analytics;