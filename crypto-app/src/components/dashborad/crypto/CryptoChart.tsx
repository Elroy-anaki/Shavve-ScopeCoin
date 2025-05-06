'use client'
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CryptoChart = () => {
  const labels = [
    "1/5", "2/5", "3/5", "4/5", "5/5", "6/5", "7/5",
    "8/5", "9/5", "10/5", "11/5", "12/5", "13/5", "14/5",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Bitcoin (BTC)",
        data: [
          42500, 42800, 43000, 42750, 43500,
          43800, 43400, 43700, 43950, 44200,
          44000, 44500, 44300, 44750,
        ],
        borderColor: "#f2a900",
        backgroundColor: "rgba(242, 169, 0, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#f2a900",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#333" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#333" },
      },
    },
  };

  return (
    <div className="w-[370px] h-[500px] md:w-[900px]">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-3xl">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">
        Change in Bitcoin Price Over the Past Two Weeks
</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CryptoChart;
