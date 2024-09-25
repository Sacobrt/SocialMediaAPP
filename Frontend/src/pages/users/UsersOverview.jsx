import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";

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
        <div className="container mx-auto py-5">
            {isLoading && <div className="text-center rounded-lg bg-green-600 animate-bounce font-bold text-gray-100">Users is loading, please wait...</div>}
            {!isLoading && (
                <div className="overflow-x-auto">
                    <button
                        className="mb-5 rounded-md bg-green-600 hover:bg-green-700 cursor-pointer w-[200px] py-2 text-center text-white font-semibold"
                        onClick={() => navigate(RoutesNames.USER_NEW)}
                    >
                        ADD NEW USER
                    </button>
                    {error && <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">{error}</div>}
                    <table className="min-w-full table-auto">
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
                                    <tr key={index}>
                                        <td className="border border-gray-800">{user.username}</td>
                                        <td className="border border-gray-800">{user.email}</td>
                                        <td className="border border-gray-800">{checkName(user.firstName)}</td>
                                        <td className="border border-gray-800">{checkName(user.lastName)}</td>
                                        <td className="border border-gray-800">{formatDate(user.createdAt)}</td>
                                        <td className="border border-gray-800">
                                            <div className="grid grid-flow-col gap-2 m-2 w-fit font-semibold">
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg"
                                                    onClick={() => navigate(`/users/${user.id}`)}
                                                >
                                                    Change
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg" onClick={() => removeUser(user.id)}>
                                                    Delete
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
