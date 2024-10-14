import { useEffect, useState } from "react";
import Service from "../../services/FollowerService";
import { useNavigate } from "react-router-dom";
import { APP_URL, RoutesNames } from "../../constants";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line, RiUserFollowFill } from "react-icons/ri";
import getRelativeTime from "../../hook/getRelativeTime";
import { FaRegCalendarAlt } from "react-icons/fa";

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

    function image(user) {
        if (user.image != null) {
            return APP_URL + user.image + `?${Date.now()}`;
        }
        return defaultImage;
    }

    return (
        <div className="container mx-auto py-8 px-5">
            {isLoading && (
                <div className="flex justify-center items-center pb-4">
                    <div className="inline-flex flex-col items-center space-y-3 py-4 px-8 bg-gray-900 rounded-lg shadow-2xl">
                        <div className="w-6 h-6 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
                        <div className="text-white font-mono text-xl tracking-wide animate-pulse">Loading content, please wait...</div>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Followers</h2>
                        <button className="btn-main" onClick={() => navigate(RoutesNames.FOLLOWER_NEW)}>
                            <RiUserFollowFill className="lg:mr-2" size={16} />
                            <span className="hidden sm:inline">Add Follower</span>
                        </button>
                    </div>

                    {error && <div className="bg-red-600 p-4 rounded-lg text-center text-white font-semibold mb-4">{error}</div>}

                    {followers.length > 0 ? (
                        <ul className="space-y-4">
                            {followers
                                .slice()
                                .reverse()
                                .map((follower, index) => {
                                    const avatarColor = `from-blue-${500 - index * 50} to-purple-${500 - index * 50}`; // Simple gradient shift
                                    return (
                                        <li
                                            key={index}
                                            className="bg-gray-800 border-2 border-transparent hover:border-blue-400 shadow-xl rounded-2xl p-5 transition-colors duration-300"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-1">
                                                    <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                                        <FaRegCalendarAlt />
                                                        {`Following since ${new Date(follower.followedAt).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}`}
                                                    </div>
                                                    <p className="text-lg font-medium text-gray-200">{follower.followerUser || "Loading..."}</p>
                                                    <p className="text-sm text-gray-500">Followed by {follower.user || "Loading..."}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-end space-x-2 mt-3">
                                                <button
                                                    className="text-blue-400 p-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-200"
                                                    onClick={() => navigate(`/followers/${follower.id}`)}
                                                    title="View"
                                                >
                                                    <MdDriveFileRenameOutline size={20} />
                                                </button>
                                                <button
                                                    className="text-red-400 p-2 rounded-full hover:bg-red-500 hover:text-white transition duration-200"
                                                    onClick={() => removeUser(follower.id)}
                                                    title="Unfollow"
                                                >
                                                    <RiDeleteBin6Line size={20} />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-400 text-lg">
                            <p>No followers found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
