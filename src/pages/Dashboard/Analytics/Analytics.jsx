import PieChart from "./PieChart/PieChart";
import BarChart from "./BarChart/BarChart"
import ColumnChart from "./ColumnChart/ColumnChart";

const Analytics = () => {
    return (
        <div className="w-full bg-white flex flex-col justify-center items-center gap-6">
            <PieChart />
            <BarChart />
            <ColumnChart />
        </div>
    );
};

export default Analytics;