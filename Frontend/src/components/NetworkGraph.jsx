import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import networkgraph from "highcharts/modules/networkgraph";
import accessibility from "highcharts/modules/accessibility";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";

networkgraph(Highcharts);
accessibility(Highcharts);

// Function to generate random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default function NetworkGraph({ customHeight = "100%" }) {
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        const fetchRandomUsers = async () => {
            try {
                const response = await UserService.randomUsers();
                const users = response?.message || [];

                if (!Array.isArray(users) || users.length === 0) {
                    console.error("No users data available.");
                    return;
                }

                const dynamicNodes = {
                    Users: {
                        id: "Users",
                        marker: { radius: 30 },
                        color: "#14b8a6",
                    },
                };
                const dynamicLinks = [];
                let i = 0;

                users.forEach((user) => {
                    dynamicNodes[user.username] = {
                        id: user.username,
                        marker: { radius: 10 },
                        color: getRandomColor(),
                    };

                    dynamicLinks.push(["Users", user.username]);
                });

                const nodeArray = Object.keys(dynamicNodes).map((id) => dynamicNodes[id]);

                const options = {
                    chart: {
                        type: "networkgraph",
                        height: customHeight,
                        backgroundColor: null,
                    },
                    title: {
                        text: " ",
                    },
                    plotOptions: {
                        networkgraph: {
                            layoutAlgorithm: {
                                enableSimulation: true,
                                linkLength: 40,
                                gravitationalConstant: 0.1,
                                friction: -0.9,
                            },
                        },
                    },
                    series: [
                        {
                            type: "networkgraph",
                            dataLabels: {
                                enabled: true,
                                linkFormat: "",
                                style: {
                                    fontSize: "0.9em",
                                    fontWeight: "normal",
                                },
                            },
                            data: dynamicLinks,
                            nodes: nodeArray,
                        },
                    ],
                };

                setChartOptions(options);
            } catch (error) {
                console.error("Error fetching or processing users:", error);
            }
        };

        fetchRandomUsers();
    }, []);

    if (!chartOptions)
        return (
            <div className="flex justify-center items-center pt-10">
                <div className="inline-flex flex-col items-center space-y-3 py-4 px-8 bg-gray-900 rounded-lg shadow-2xl">
                    <div className="w-6 h-6 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
                    <div className="text-gray-200 font-mono text-xl tracking-wide animate-pulse">Loading user chart...</div>
                </div>
            </div>
        );

    return (
        <div className="max-h-lg">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}
