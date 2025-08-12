"use client"

import React, { useState } from "react";
import ApexChart from "react-apexcharts";

const RevenueChart: React.FC = () => {
    const [timeRange, setTimeRange] = useState<"day" | "week" | "month">(
        "month"
    );

    const chartOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },
        markers: {
            size: 5,
            colors: ["#3B82F6"], // Tailwind blue-500
            strokeWidth: 2,
            hover: { size: 7 },
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            row: {
                colors: ["#EFF6FF", "#fff"], // alternating light blue
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
            labels: {
                style: {
                    fontSize: "14px",
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (value: number) => `${value / 1_000_000}M`,
            },
            min: 0,
            max: 400_000_000,
            tickAmount: 5,
        },
        colors: ["#3B82F6"],
    };

    const chartSeries = [
        {
            name: "Doanh thu",
            data: [280_000_000, 330_000_000, 290_000_000, 350_000_000],
        },
    ];

    return (
        <div className="">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Doanh thu
                </h2>
                <div className="flex space-x-2">
                    {["day", "week", "month"].map((range) => (
                        <button
                            key={range}
                            onClick={() =>
                                setTimeRange(range as "day" | "week" | "month")
                            }
                            className={`px-3 py-1 text-sm rounded-full ${
                                timeRange === range
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 hover:text-blue-500"
                            }`}
                        >
                            {range === "day"
                                ? "Ngày"
                                : range === "week"
                                ? "Tuần"
                                : "Tháng"}
                        </button>
                    ))}
                </div>
            </div>
            <ApexChart
                options={chartOptions as any}
                series={chartSeries}
                type="line"
                height={300}
            />
        </div>
    );
};

export default RevenueChart;
