import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import getRelativeTime from "../../hook/getRelativeTime";

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

    return (
        <div className="container mx-auto py-5 px-5">
            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-xl animate-bounce-slow text-white font-bold text-lg flex items-center space-x-3">
                        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Loading users, please wait...</span>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
                        <button
                            className="flex items-center justify-center gap-2 rounded-full bg-green-600 hover:bg-green-700 transition duration-200 cursor-pointer px-6 py-2 text-center text-white font-semibold shadow-lg"
                            onClick={() => navigate(RoutesNames.USER_NEW)}
                        >
                            <FaUsers />
                            <span className="hidden sm:inline">CREATE ACCOUNT</span>
                        </button>
                    </div>

                    {error && <div className="mb-5 bg-red-500 p-3 rounded-lg text-center text-white font-semibold shadow-md">{error}</div>}

                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <div
                                    key={index}
                                    className="bg-white border-2 border-gray-300 shadow-md rounded-md p-5 flex flex-col items-center justify-center space-y-4"
                                >
                                    <div className="bg-gradient-to-r from-green-400 to-teal-400 rounded-full w-20 h-20 flex items-center justify-center text-4xl font-bold text-white shadow-md">
                                        {user.username?.charAt(0) || "?"}
                                    </div>
                                    <div className="text-center space-y-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                        <p className="text-sm text-gray-500">
                                            {checkName(user.firstName)} {checkName(user.lastName)}
                                        </p>
                                        <p className="text-sm text-gray-400">{getRelativeTime(user.createdAt)}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800" onClick={() => navigate(`/users/${user.id}`)} title="Edit User">
                                                <MdDriveFileRenameOutline size={20} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" onClick={() => removeUser(user.id)} title="Delete User">
                                                <RiDeleteBin6Line size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center col-span-full">
                                <p className="text-lg text-gray-500">No users found.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
