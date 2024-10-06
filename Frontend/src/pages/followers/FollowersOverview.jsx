import { useEffect, useState } from "react";
import Service from "../../services/FollowerService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line, RiUserFollowFill } from "react-icons/ri";
import getRelativeTime from "../../hook/getRelativeTime";

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
                <div className="flex justify-center items-center h-96">
                    <div className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
                        <span>Loading followers, please wait...</span>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold text-gray-800">Followers</h2>
                        <button
                            className="flex items-center justify-center gap-2 rounded-full bg-green-600 hover:bg-green-700 transition duration-200 cursor-pointer px-6 py-2 text-center text-white font-semibold shadow-lg"
                            onClick={() => navigate(RoutesNames.FOLLOWER_NEW)}
                        >
                            <RiUserFollowFill />
                            <span className="hidden sm:inline">ADD FOLLOWER</span>
                        </button>
                    </div>

                    {error && <div className="bg-red-500 p-4 rounded-lg text-center text-white font-semibold">{error}</div>}

                    {followers.length > 0 ? (
                        <ul className="space-y-4">
                            {followers
                                .slice()
                                .reverse()
                                .map((follower, index) => (
                                    <div key={index} className="bg-white shadow-md rounded-lg p-5 border-2 border-gray-300">
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full uppercase w-12 h-12 flex items-center justify-center text-lg font-bold text-white shadow-md">
                                                {follower.followerUser?.charAt(0) || "?"}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs text-gray-400">{getRelativeTime(follower.followedAt)}</div>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-lg font-medium text-gray-700">{followers[index].followerUser || "Loading..."}</p>
                                                        <p className="text-sm text-gray-500">Followed by {followers[index].user || "Loading..."}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => navigate(`/followers/${follower.id}`)}
                                                title="View"
                                            >
                                                <MdDriveFileRenameOutline size={20} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" onClick={() => removeUser(follower.id)} title="Unfollow">
                                                <RiDeleteBin6Line size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-600 text-lg">
                            <p>No followers found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
