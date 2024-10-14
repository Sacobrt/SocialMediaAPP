import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { APP_URL, RoutesNames } from "../../constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import defaultImage from "../../assets/defaultImage.png";

export default function UsersOverview() {
    const [users, setUsers] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    async function getUsers() {
        await UserService.get()
            .then((response) => {
                setUsers(response);
                setIsLoading(false);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    useEffect(() => {
        getUsers();
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
        const response = await UserService.remove(id);
        if (response.error) {
            setError(response.message);
            return;
        }
        getUsers();
    }

    function removeUser(id) {
        removeAsync(id);
    }

    function checkName(name) {
        if (name == null) return " ";
        if (name == "") return " ";
        return name;
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
                        <h2 className="text-2xl font-semibold text-gray-100">Users</h2>
                        <button className="btn-main" onClick={() => navigate(RoutesNames.USER_NEW)}>
                            <FaUsers className="lg:mr-2" />
                            <span className="hidden sm:inline">Create Account</span>
                        </button>
                    </div>

                    {error && <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold shadow-md">{error}</div>}

                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <div
                                    key={index}
                                    className="relative bg-gray-900 border border-gray-600 rounded-2xl p-6 flex flex-col items-center text-center shadow-neon hover:shadow-neon-lg transition-shadow duration-300 ease-in-out"
                                >
                                    <div className="profile-avatar w-24 h-24 mb-4 rounded-full overflow-hidden">
                                        <img src={image(user)} alt={user.username} className="object-cover w-full h-full" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-200">{user.username}</h3>
                                    <p className="text-sm text-gray-400 mb-2">{user.email}</p>
                                    <p className="text-xs text-teal-400">
                                        {checkName(user.firstName)} {checkName(user.lastName)}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        <FaRegCalendarAlt />
                                        {`Joined ${new Date(user.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}`}
                                    </p>
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            className="text-blue-400 p-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-200"
                                            onClick={() => navigate(`/users/${user.id}`)}
                                            title="Edit User"
                                        >
                                            <MdDriveFileRenameOutline size={20} />
                                        </button>
                                        <button
                                            className="text-red-400 p-2 rounded-full hover:bg-red-500 hover:text-white transition duration-200"
                                            onClick={() => removeUser(user.id)}
                                            title="Delete User"
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-400 text-xl">No users yet. Start by adding one!</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
