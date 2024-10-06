import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/FollowerService";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

export default function FollowersAdd() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [userID, setUsersID] = useState(0);
    const [followerUserID, setFollowersUserID] = useState(0);

    async function getUsers() {
        const response = await UserService.get();
        setUsers(response);
        setUsersID(response[0].id);
        setFollowersUserID(response[0].id);
    }

    useEffect(() => {
        getUsers();
    }, []);

    async function add(user) {
        const response = await Service.add(user);
        if (response.error) {
            setError(response.message);
            return;
        }
        navigate(RoutesNames.FOLLOWER_OVERVIEW);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(localDate.getTime() - offset * 60 * 1000).toISOString().slice(0, -1);

        add({
            userID: userID,
            followerUserID: followerUserID,
            followedAt: formattedDate,
        });
    }

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Follower</h1>

            {error && (
                <div className="mb-6 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="userID" className="block text-gray-700 font-semibold mb-2">
                            Select a user <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            onChange={(e) => setUsersID(e.target.value)}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:ring-0"
                        >
                            {users &&
                                users.map((user, index) => (
                                    <option key={index} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="followerUserID" className="block text-gray-700 font-semibold mb-2">
                            Select a user to follow <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="followerUserID"
                            name="followerUserID"
                            onChange={(e) => setFollowersUserID(e.target.value)}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:ring-0"
                        >
                            {users &&
                                users.map((user, index) => (
                                    <option key={index} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 space-x-4">
                    <Link
                        to={RoutesNames.FOLLOWER_OVERVIEW}
                        className="bg-red-400 flex items-center justify-center text-white px-4 py-3 rounded-md font-semibold hover:bg-red-500 transition-colors"
                    >
                        <MdCancel className="mr-2" />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 flex items-center justify-center text-white px-4 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                    >
                        <RiUserFollowLine className="mr-2" />
                        Add Follower
                    </button>
                </div>
            </form>
        </div>
    );
}
