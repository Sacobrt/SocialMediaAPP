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
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Change Follower</h1>

            {error && (
                <div className="mb-6 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="userID" className="block text-gray-700 font-semibold mb-2">
                            User
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            value={usersID}
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
                            Following
                        </label>
                        <select
                            id="followerUserID"
                            name="followerUserID"
                            value={followersUserID}
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

                    <div>
                        <label htmlFor="followedAt" className="block text-gray-700 font-semibold mb-2">
                            Followed At
                        </label>
                        <input
                            type="date"
                            name="followedAt"
                            id="followedAt"
                            defaultValue={followers.followedAt}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:ring-0"
                        />
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
                        <MdOutlineSaveAlt className="mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
