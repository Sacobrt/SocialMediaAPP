import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/FollowerService";
import UserService from "../../services/UserService";
import moment from "moment";
import { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

export default function FollowersAdd() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState("");
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

        const data = new FormData(e.target);

        add({
            userID: data.get("userID"),
            followerUserID: data.get("followerUserID"),
            followedAt: moment.utc(data.get("followedAt")),
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

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        setCurrentDate(formattedDate);
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-xl font-bold mb-4">Add New Followers</h1>
            {error && (
                <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="mb-4 flex-1">
                        <label htmlFor="userID" className="font-medium text-gray-800">
                            User <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            onChange={(e) => setUsersID(e.target.value)}
                            className="mt-1 block w-full py-2 pl-3 pr-10 border-2 border-gray-800 rounded-md bg-white text-gray-900"
                        >
                            {users &&
                                users.map((user, index) => (
                                    <option key={index} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-4 flex-1">
                        <label htmlFor="followerUserID" className="font-medium text-gray-800">
                            Following User <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                            id="followerUserID"
                            name="followerUserID"
                            onChange={(e) => setFollowersUserID(e.target.value)}
                            className="mt-1 block w-full py-2 pl-3 pr-10 border-2 border-gray-800 rounded-md bg-white text-gray-900"
                        >
                            {users &&
                                users.map((user, index) => (
                                    <option key={index} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-4 flex-1">
                        <label htmlFor="followedAt" className="font-medium text-gray-800">
                            Started Following <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="date"
                            name="followedAt"
                            id="followedAt"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                            className="mt-1 block w-full py-1.5 pl-3 pr-10 border-2 border-gray-800 rounded-md bg-white text-gray-900"
                        />
                    </div>
                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <Link
                        to={RoutesNames.FOLLOWER_OVERVIEW}
                        className="bg-red-500 gap-2 flex items-center justify-center text-white py-1 rounded-md text-center font-semibold hover:bg-red-700"
                    >
                        <MdCancel />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 gap-2 flex items-center justify-center text-white py-1 rounded-md hover:bg-blue-700 w-full font-semibold"
                    >
                        <RiUserFollowLine />
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
