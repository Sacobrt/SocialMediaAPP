import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/FollowerService";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdCancel, MdDriveFileRenameOutline } from "react-icons/md";

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

        change({
            userID: data.get("userID"),
            followerUserID: data.get("followerUserID"),
            followedAt: moment.utc(data.get("followedAt")),
        });
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-xl font-bold mb-4">Change Followers</h1>
            {error && (
                <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="userID" className="font-medium text-gray-800">
                            User
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            value={usersID}
                            onChange={(e) => setUsersID(e.target.value)}
                            className="mt-1 block w-full py-2 pl-3 pr-10 border-2 border-gray-800 rounded-md bg-white text-gray-900"
                        >
                            {users &&
                                users.map((i, index) => (
                                    <option key={index} value={i.id}>
                                        {i.username}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="followerUserID" className="font-medium text-gray-800">
                            Following
                        </label>
                        <select
                            id="followerUserID"
                            name="followerUserID"
                            value={followersUserID}
                            onChange={(e) => setFollowersUserID(e.target.value)}
                            className="mt-1 block w-full py-2 pl-3 pr-10 border-2 border-gray-800 rounded-md bg-white text-gray-900"
                        >
                            {users &&
                                users.map((i, index) => (
                                    <option key={index} value={i.id}>
                                        {i.username}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="followedAt" className="font-medium text-gray-700">
                            Followed At
                        </label>
                        <input
                            type="date"
                            name="followedAt"
                            id="followedAt"
                            defaultValue={followers.followedAt}
                            className="mt-1 block w-full py-1.5 pl-3 pr-10 border-2 border-gray-800 rounded-md bg-white text-gray-900"
                        />
                    </div>
                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <Link
                        to={RoutesNames.FOLLOWER_OVERVIEW}
                        className="bg-red-500 gap-2 flex items-center justify-center text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-red-700"
                    >
                        <MdCancel />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 gap-2 flex items-center justify-center text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full font-semibold"
                    >
                        <MdDriveFileRenameOutline />
                        Change
                    </button>
                </div>
            </form>
        </div>
    );
}
