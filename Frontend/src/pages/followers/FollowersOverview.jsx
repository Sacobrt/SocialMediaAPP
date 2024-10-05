import { useEffect, useState } from "react";
import Service from "../../services/FollowerService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line, RiUserFollowLine } from "react-icons/ri";

export default function FollowersOverview() {
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    async function getFollowers() {
        const response = await Service.get();
        if (response.error) {
            setError(response.message);
        } else {
            setFollowers(response);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFollowers();
    }, []);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [error]);

    async function removeAsync(id) {
        const response = await Service.remove(id);
        if (response.error) {
            setError(response.message);
            return;
        }
        getFollowers();
    }

    function removeUser(id) {
        removeAsync(id);
    }

    return (
        <div className="container mx-auto py-5 px-5">
            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-xl animate-bounce-slow text-white font-bold text-lg flex items-center space-x-3">
                        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Loading followers, please wait...</span>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div className="overflow-x-auto">
                    <button
                        className="mb-5 flex items-center justify-center gap-2 rounded-md bg-green-600 hover:bg-green-700 transition duration-200 cursor-pointer w-fit px-6 py-2 text-center text-white font-semibold shadow-lg"
                        onClick={() => navigate(RoutesNames.FOLLOWER_NEW)}
                    >
                        <RiUserFollowLine />
                        ADD NEW FOLLOWER
                    </button>
                    {error && <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">{error}</div>}
                    <table className="min-w-full table-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr className="text-center uppercase">
                                <th className="border border-gray-800 py-2">Follower Username</th>
                                <th className="border border-gray-800 py-2">Followed Username</th>
                                <th className="border border-gray-800 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {followers.length > 0 ? (
                                followers.map((follower, index) => (
                                    <tr key={index} className="hover:bg-gray-100 transition duration-200">
                                        <td className="border border-gray-800 py-2">{followers[index].user || "Loading..."}</td>
                                        <td className="border border-gray-800 py-2">{followers[index].followerUser || "Loading..."}</td>
                                        <td className="border border-gray-800 py-2">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition duration-200"
                                                    onClick={() => navigate(`/followers/${follower.id}`)}
                                                >
                                                    <MdDriveFileRenameOutline />
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition duration-200"
                                                    onClick={() => removeUser(follower.id)}
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border border-gray-800 py-2 text-center">
                                        No followers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
