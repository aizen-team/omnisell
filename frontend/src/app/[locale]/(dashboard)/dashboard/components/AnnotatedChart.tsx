"use client"

import React from "react";
import ApexChart from "react-apexcharts";

const AnnotatedChart = () => {
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            height: 400,
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        annotations: {
            yaxis: [
                {
                    y: 8200,
                    borderColor: "#00E396",
                    label: {
                        borderColor: "#00E396",
                        style: {
                            color: "#fff",
                            background: "#00E396",
                        },
                        text: "Support",
                    },
                },
                {
                    y: 9000,
                    y2: 9200,
                    borderColor: "#FFFA",
                    fillColor: "#FFE0B2",
                    opacity: 0.4,
                    label: {
                        text: "Y-axis range",
                        borderColor: "#FFB347",
                        style: {
                            color: "#000",
                            background: "#FFB347",
                        },
                    },
                },
            ],
            xaxis: [
                {
                    x: new Date("23 Nov 2017").getTime(),
                    borderColor: "#775DD0",
                    label: {
                        style: {
                            color: "#fff",
                            background: "#775DD0",
                        },
                        text: "Anno Test",
                    },
                },
                {
                    x: new Date("26 Nov 2017").getTime(),
                    x2: new Date("29 Nov 2017").getTime(),
                    fillColor: "#B3F7CA",
                    opacity: 0.4,
                    label: {
                        text: "X-axis range",
                        style: {
                            color: "#000",
                            background: "#00E396",
                        },
                    },
                },
            ],
            points: [
                {
                    x: new Date("01 Dec 2017").getTime(),
                    y: 8600,
                    marker: {
                        size: 8,
                        fillColor: "#fff",
                        strokeColor: "#FF4560",
                        // radius: 2,
                    },
                    label: {
                        borderColor: "#FF4560",
                        offsetY: 0,
                        style: {
                            color: "#fff",
                            background: "#FF4560",
                        },
                        text: "Point Annotation",
                    },
                },
                {
                    x: new Date("07 Dec 2017").getTime(),
                    y: 9400,
                    marker: {
                        size: 10,
                        fillColor: "#fff",
                        strokeColor: "#FF00FF",
                        shape: "circle",
                    },
                    label: {
                        borderColor: "#FF00FF",
                        style: {
                            color: "#000",
                            background: "#FFD700",
                            fontSize: "12px",
                        },
                        text: "🎯",
                    },
                },
            ],
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "datetime",
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy",
            },
        },
    };

    const series = [
        {
            name: "Doanh thu",
            data: [
                [new Date("13 Nov 2017").getTime(), 8100],
                [new Date("14 Nov 2017").getTime(), 8120],
                [new Date("16 Nov 2017").getTime(), 8350],
                [new Date("19 Nov 2017").getTime(), 8450],
                [new Date("22 Nov 2017").getTime(), 8550],
                [new Date("25 Nov 2017").getTime(), 8600],
                [new Date("28 Nov 2017").getTime(), 8800],
                [new Date("01 Dec 2017").getTime(), 8600],
                [new Date("04 Dec 2017").getTime(), 8500],
                [new Date("07 Dec 2017").getTime(), 9450],
            ],
        },
    ];

    return (
        <div className="shadow-lg p-4 mt-5 rounded-xl">
            <h2>Doanh thu theo ngày</h2>
            <ApexChart
                options={chartOptions}
                series={series}
                type="line"
                height={400}
            />
        </div>
    );
};

export default AnnotatedChart;
