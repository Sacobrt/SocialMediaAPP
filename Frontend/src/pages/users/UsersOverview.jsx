import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import UserService from "../../services/UserService";

export default function UsersOverview() {
    const [users, setUsers] = useState();

    async function getUsers() {
        await UserService.get()
            .then((response) => {
                setUsers(response);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    function formatDate(date) {
        if (date == null) {
            return "Not defined";
        }
        return moment.utc(date).format("DD.MM.YYYY.");
    }

    return (
        <div className="container mx-auto py-4">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr className="text-center uppercase">
                            <th className="py-2">Username</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">First Name</th>
                            <th className="py-2">Last Name</th>
                            <th className="py-2">Created At</th>
                            <th className="py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {users &&
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-800">{user.username}</td>
                                    <td className="border border-gray-800">{user.email}</td>
                                    <td className="border border-gray-800">{user.firstName == null ? "-" : user.firstName}</td>
                                    <td className="border border-gray-800">{user.lastName == null ? "-" : user.lastName}</td>
                                    <td className="border border-gray-800">{formatDate(user.createdAt)}</td>
                                    <td className="border border-gray-800">-</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
