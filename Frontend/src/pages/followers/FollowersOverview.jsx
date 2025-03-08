import { useEffect, useState } from "react";
import Service from "../../services/FollowerService";
import { RoutesNames } from "../../constants";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line, RiUserFollowFill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FollowersOverview() {
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState("");

    async function getFollowers() {
        const response = await Service.getPagination(page, condition);

        if (response.error) {
            setError(response.message);
            return;
        }
        if (response.message.length == 0) {
            setPage(page - 1);
            return;
        }
        setFollowers(response.message);
        setIsLoading(false);
    }

    useEffect(() => {
        getFollowers();
    }, [page, condition]);

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

    function changeCondition(e) {
        setPage(1);
        setCondition(e.nativeEvent.srcElement.value);
        setFollowers([]);
    }

    function increasePage() {
        setPage(page + 1);
    }

    function reducePage() {
        if (page == 1) {
            return;
        }
        setPage(page - 1);
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
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">Followers</h2>

                        {/* Search and Pagination */}
                        <div className="flex flex-row justify-between gap-4">
                            <div className="relative w-full sm:w-1/3">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search..."
                                    maxLength={32}
                                    onKeyUp={changeCondition}
                                    className="w-fit p-2 pl-10 bg-gray-800 text-white border border-gray-700 rounded-full transition-all duration-300 focus:outline-hidden focus:ring-1 focus:ring-blue-400"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>

                            {followers && followers.length > 0 && (
                                <div className="flex items-center justify-center space-x-3">
                                    <button onClick={reducePage} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                    </button>
                                    <span className="text-lg text-gray-300">{page}</span>
                                    <button onClick={increasePage} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        <Link to={RoutesNames.FOLLOWER_NEW} className="btn-main mt-2 sm:mt-0">
                            <RiUserFollowFill size={16} className="sm:mr-2" /> <span>Add Follower</span>
                        </Link>
                    </div>

                    {error && <div className="bg-red-600 p-4 rounded-lg text-center text-white font-semibold mb-4">{error}</div>}

                    {followers.length > 0 ? (
                        <ul className="space-y-4">
                            {followers.map((follower, index) => {
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
                                            <Link className="btn-edit" to={`/followers/${follower.id}`}>
                                                <MdDriveFileRenameOutline size={20} />
                                            </Link>
                                            <button className="btn-delete" onClick={() => removeUser(follower.id)} title="Unfollow">
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
