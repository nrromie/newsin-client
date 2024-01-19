import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Loading from "../../../../components/Loading/Loading";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const BarChart = () => {

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [articlesNum, setArticlesNum] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get('/articlestats');
                setArticlesNum(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    const data = [
        ["Year", "Total", "Premium", "Normal"],
        ["All time", articlesNum.totalArticles, articlesNum.premiumArticlesCount, (articlesNum.totalArticles - articlesNum.premiumArticlesCount)],
    ];
    const options = {
        chart: {
            title: "Articles Statistics",
            subtitle: "Total Articles of all time",
        },
    };

    return (
        <Chart
            chartType="Bar"
            width="600px"
            height="400px"
            data={data}
            options={options}
        />
    );
};

export default BarChart;