import { useEffect, useState } from "react";
import CountUp from "react-countup";
import UserService from "../services/UserService";

function TotalData() {
    const [totalData, setTotalData] = useState(0);

    async function getTotalData() {
        await UserService.totalData()
            .then((response) => {
                setTotalData(response);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    useEffect(() => {
        getTotalData();
    }, []);

    return (
        <div className="flex justify-center mt-10 bg-gray-900 bg-opacity-80 rounded-md">
            <div className="p-8 w-full text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
                    <div className="">
                        <p className="text-4xl font-extrabold text-gray-300">
                            <CountUp start={0} end={totalData.users} duration={20} separator="."></CountUp>
                        </p>
                        <p className="text-gray-500">Active Members</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-4xl font-extrabold text-gray-300">
                            <CountUp start={0} end={totalData.posts} duration={20} separator="."></CountUp>
                        </p>
                        <p className="text-gray-500">Active Posts</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-4xl font-extrabold text-gray-300">
                            <CountUp start={0} end={totalData.comments} duration={20} separator="."></CountUp>
                        </p>
                        <p className="text-gray-500">Total Comments</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TotalData;
