import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Loading from "../../../../components/Loading/Loading";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const ColumnChart = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [userNums, setUserNums] = useState([]);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await axiosPublic.get('/userstats');
                setUserNums(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchPublishers();
    }, []);

    if (loading) {
        return <Loading />;
    }

    const data = [
        ["Users", "Number of Users", { role: "style" }],
        ["Total", userNums.totalUsers, "violet"],
        ["Premium", userNums.premiumUsers, "green"],
        ["Normal", (userNums.totalUsers - userNums.premiumUsers), "skyblue"],
    ];

    return (
        <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
    );
};

export default ColumnChart;