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
        <div className="container mx-auto px-5 py-12 max-w-4xl">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Add New Follower
            </h1>

            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold animate-bounce">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["userID", "followerUserID"].map((field, index) => {
                        const labels = {
                            userID: "Select a user",
                            followerUserID: "Select a user to follow",
                        };
                        return (
                            <div key={index}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
                                    {labels[field]} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id={field}
                                    name={field}
                                    onChange={(e) => (field === "userID" ? setUsersID(e.target.value) : setFollowersUserID(e.target.value))}
                                    className="block w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:border-blue-500 focus:outline-none transition-all"
                                >
                                    <option value="" disabled selected>
                                        Choose a user
                                    </option>
                                    {users.map((user, idx) => (
                                        <option key={idx} value={user.id}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end space-x-4">
                    <Link to={RoutesNames.FOLLOWER_OVERVIEW} className="btn-cancel">
                        <MdCancel className="lg:mr-2" />
                        <span>Cancel</span>
                    </Link>
                    <button type="submit" className="btn-main">
                        <RiUserFollowLine className="lg:mr-2" />
                        <span>Add Follower</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
