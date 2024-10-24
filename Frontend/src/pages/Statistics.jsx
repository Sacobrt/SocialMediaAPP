import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import StatisticsService from "../services/StatisticsService";
import moment from "moment";
import NetworkGraph from "../components/NetworkGraph";
import TotalData from "../components/TotalData";

export default function Statistics() {
    const [statsData, setStatsData] = useState({});
    const [recentUsers, setRecentUsers] = useState([]);

    async function getTotalData() {
        await StatisticsService.topUserStats()
            .then((response) => {
                setStatsData(response);
                createCharts(response);
                setRecentUsers(response.mostRecentUsers);
                createRecentUsersChart(response.mostRecentUsers);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    useEffect(() => {
        getTotalData();
    }, []);

    function createCharts(data) {
        // Chart 1: Most Liked Content
        Highcharts.chart("mostLikedContent", {
            chart: {
                type: "column",
                backgroundColor: null,
                style: {
                    fontFamily: "'Roboto', sans-serif",
                },
                spacing: [10, 10, 15, 10],
            },
            title: {
                text: "Most Liked Content",
                style: {
                    fontSize: "20px",
                    color: "#f7f7f7",
                },
            },
            xAxis: {
                categories: ["Most Liked Comment", "Most Liked Post"],
                labels: {
                    style: {
                        color: "#f7f7f7",
                    },
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Number of Likes",
                    style: {
                        color: "#f7f7f7",
                    },
                },
                labels: {
                    style: {
                        color: "#f7f7f7",
                    },
                },
                gridLineColor: "#e6e6e6",
            },
            tooltip: {
                valueSuffix: " likes",
                backgroundColor: "#f7f7f7",
                borderColor: "#ccc",
            },
            series: [
                {
                    name: "Likes",
                    color: "#2b908f",
                    data: [data.mostLikedComment.likeCount, data.mostLikedPost.likeCount],
                },
            ],
            legend: {
                itemStyle: {
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                },
                itemHoverStyle: {
                    color: "#2b908f",
                },
            },
            plotOptions: {
                column: {
                    borderRadius: 5,
                },
            },
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            chart: {
                                height: "300px",
                            },
                        },
                    },
                ],
            },
        });

        // Chart 2: Top Users by Comments
        Highcharts.chart("topUsersByComments", {
            chart: {
                type: "bar",
                backgroundColor: null,
            },
            title: {
                text: "Top users by making comments",
                style: {
                    fontSize: "20px",
                    color: "#f7f7f7",
                },
            },
            xAxis: {
                categories: data.topUsersByComments.map((data) => data.user.username),
                labels: {
                    style: {
                        color: "#f7f7f7",
                    },
                },
            },
            yAxis: {
                min: 0,
                labels: { style: { color: "#f7f7f7" } },
                title: {
                    text: "Number of Comments",
                    style: {
                        labels: { style: { color: "#f7f7f7" } },
                        color: "#f7f7f7",
                    },
                },
                gridLineColor: "#e6e6e6",
            },
            tooltip: {
                valueSuffix: " comments",
                backgroundColor: "#f7f7f7",
                borderColor: "#ccc",
            },
            series: [
                {
                    name: "Comments",
                    color: "#7798BF",
                    data: data.topUsersByComments.map((data) => data.commentCount),
                },
            ],
            legend: {
                itemStyle: {
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                },
                itemHoverStyle: {
                    color: "#7798BF",
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                },
            },
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            chart: {
                                height: "300px",
                            },
                        },
                    },
                ],
            },
        });

        // Chart 3: Top Users by Posts
        Highcharts.chart("topUsersByPosts", {
            chart: {
                type: "bar",
                backgroundColor: null,
            },
            title: {
                text: "Top users by making posts",
                style: {
                    fontSize: "20px",
                    color: "#f7f7f7",
                },
            },
            xAxis: {
                categories: data.topUsersByPosts.map((data) => data.user.username),
                labels: {
                    style: {
                        color: "#f7f7f7",
                    },
                },
            },
            yAxis: {
                min: 0,
                labels: { style: { color: "#f7f7f7" } },
                title: {
                    text: "Number of Posts",
                    style: {
                        color: "#f7f7f7",
                    },
                },
                gridLineColor: "#e6e6e6",
            },
            tooltip: {
                valueSuffix: " posts",
                backgroundColor: "#f7f7f7",
                borderColor: "#ccc",
            },
            series: [
                {
                    name: "Posts",
                    color: "#f45b5b",
                    data: data.topUsersByPosts.map((data) => data.postCount),
                },
            ],
            legend: {
                itemStyle: {
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                },
                itemHoverStyle: {
                    color: "#f45b5b",
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                },
            },
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            chart: {
                                height: "300px",
                            },
                        },
                    },
                ],
            },
        });
    }

    // Function to create the chart for most recent users
    function createRecentUsersChart(users) {
        const categories = users.map((data) => moment(data.date).format("DD.MM.YYYY"));
        const count = users.map((data) => data.count);

        Highcharts.chart("recentUsersChart", {
            chart: {
                type: "line",
                backgroundColor: null,
            },
            title: {
                text: "Registered users in the last 30 days",
                style: { fontSize: "18px", color: "#f7f7f7", fontWeight: "600" },
            },
            legend: {
                itemStyle: {
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                },
                itemHoverStyle: {
                    color: "#00ff00",
                },
            },
            xAxis: {
                categories: categories,
                labels: { style: { color: "#f7f7f7" } },
                title: { text: "Date", style: { color: "#f7f7f7" } },
            },
            yAxis: {
                labels: {
                    style: {
                        color: "#f7f7f7",
                    },
                },
                title: { text: "Number of Users", style: { color: "#f7f7f7" } },
                gridLineColor: "#e6e6e6",
            },
            series: [
                {
                    name: "Users",
                    data: count,
                    color: "#28A745",
                    fillOpacity: 0.5,
                    marker: {
                        enabled: true,
                        radius: 4,
                        symbol: "circle",
                    },
                },
            ],
        });
    }

    return (
        <div className="container mx-auto pb-10 space-y-10">
            <TotalData />
            <NetworkGraph customHeight="50%" />
            <div className="grid grid-cols-2 gap-10">
                <div
                    className="p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-110 border border-gray-700 transition-all duration-500 ease-in-out"
                    id="recentUsersChart"
                    style={{ width: "100%", height: "400px" }}
                ></div>
                <div
                    className="p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-110 border border-gray-700 transition-all duration-500 ease-in-out"
                    id="mostLikedContent"
                    style={{ width: "100%", height: "400px" }}
                ></div>
            </div>
            <div className="grid grid-cols-2 gap-10">
                <div
                    className="p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-110 border border-gray-700 transition-all duration-500 ease-in-out"
                    id="topUsersByPosts"
                    style={{ width: "100%", height: "400px" }}
                ></div>
                <div
                    className="p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-110 border border-gray-700 transition-all duration-500 ease-in-out"
                    id="topUsersByComments"
                    style={{ width: "100%", height: "400px" }}
                ></div>
            </div>
        </div>
    );
}
