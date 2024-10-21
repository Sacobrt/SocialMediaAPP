import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/FollowerService";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdCancel, MdOutlineSaveAlt } from "react-icons/md";

export default function FollowersChange() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [followers, setFollowers] = useState({});
    const [users, setUsers] = useState([]);
    const [usersID, setUsersID] = useState(0);
    const [followersUserID, setFollowersUserID] = useState(0);
    const [error, setError] = useState();

    async function getFollowers() {
        const response = await Service.getByID(routeParams.id);
        if (response.error) {
            setError(response.message);
            return;
        }
        response.message.followedAt = moment.utc(response.message.followedAt).format("yyyy-MM-DD");
        setFollowers(response.message);
        setUsersID(response.message.userID);
        setFollowersUserID(response.message.followerUserID);
    }

    async function getUsers() {
        const response = await UserService.get();
        if (response.error) {
            setError(response.message);
            return;
        }
        setUsers(response);
    }

    async function getData() {
        await getFollowers();
        await getUsers();
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [error]);

    async function change(followers) {
        const response = await Service.change(routeParams.id, followers);
        if (response.error) {
            setError(response.message);
            return;
        }
        navigate(RoutesNames.FOLLOWER_OVERVIEW);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(moment.utc(data.get("followedAt")) - offset * 60 * 1000).toISOString().slice(0, -1);

        change({
            userID: data.get("userID"),
            followerUserID: data.get("followerUserID"),
            followedAt: formattedDate,
        });
    }

    return (
        <div className="container mx-auto max-w-4xl px-5 py-12">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ">
                Change Follower
            </h1>

            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold animate-bounce">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["userID", "followerUserID", "followedAt"].map((field, index) => {
                        const labels = {
                            userID: "User",
                            followerUserID: "Following",
                            followedAt: "Followed At",
                        };
                        return (
                            <div key={index}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
                                    {labels[field]}
                                </label>
                                {field !== "followedAt" ? (
                                    <select
                                        id={field}
                                        name={field}
                                        value={field === "userID" ? usersID : followersUserID}
                                        onChange={(e) => (field === "userID" ? setUsersID(e.target.value) : setFollowersUserID(e.target.value))}
                                        className="block w-full px-4 py-3 border-2 border-transparent bg-gray-700 text-white rounded-full focus:border-blue-500 focus:outline-none transition-all"
                                    >
                                        {users.map((user, idx) => (
                                            <option key={idx} value={user.id}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="date"
                                        name={field}
                                        id={field}
                                        defaultValue={followers.followedAt}
                                        className="block w-full px-4 py-3 border-2 border-transparent bg-gray-700 text-white rounded-full focus:border-blue-500 focus:outline-none transition-all"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end space-x-4">
                    <Link to={RoutesNames.FOLLOWER_OVERVIEW} className="btn-cancel">
                        <MdCancel />
                        <span>Cancel</span>
                    </Link>
                    <button type="submit" className="btn-main">
                        <MdOutlineSaveAlt />
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
