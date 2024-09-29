import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { RiDeleteBin6Line, RiUserFollowLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";

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

    function formatDate(date) {
        if (date == null) {
            return "Not defined";
        }
        return moment.utc(date).format("DD.MM.YYYY.");
    }

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
        if (name == null) return "-";
        if (name == "") return "-";
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
                <div className="overflow-x-auto">
                    <button
                        className="mb-5 flex items-center justify-center gap-2 rounded-md bg-green-600 hover:bg-green-700 transition duration-200 cursor-pointer w-fit px-6 py-2 text-center text-white font-semibold shadow-lg"
                        onClick={() => navigate(RoutesNames.USER_NEW)}
                    >
                        <RiUserFollowLine />
                        ADD NEW USER
                    </button>
                    {error && <div className="mb-5 bg-red-500 p-3 rounded-lg text-center text-white font-semibold shadow-md">{error}</div>}
                    <table className="min-w-full table-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr className="text-center uppercase">
                                <th className="border border-gray-800 py-2">Username</th>
                                <th className="border border-gray-800 py-2">Email</th>
                                <th className="border border-gray-800 py-2">First Name</th>
                                <th className="border border-gray-800 py-2">Last Name</th>
                                <th className="border border-gray-800 py-2">Created At</th>
                                <th className="border border-gray-800 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {users &&
                                users.map((user, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="border border-gray-300 py-2">{user.username}</td>
                                        <td className="border border-gray-300 py-2">{user.email}</td>
                                        <td className="border border-gray-300 py-2">{checkName(user.firstName)}</td>
                                        <td className="border border-gray-300 py-2">{checkName(user.lastName)}</td>
                                        <td className="border border-gray-300 py-2">{formatDate(user.createdAt)}</td>
                                        <td className="border border-gray-300 py-2">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition duration-200"
                                                    onClick={() => navigate(`/users/${user.id}`)}
                                                >
                                                    <MdDriveFileRenameOutline />
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition duration-200"
                                                    onClick={() => removeUser(user.id)}
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
