import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserService from "../../services/UserService";
import moment from "moment";
import { useEffect, useState } from "react";

export default function UsersAdd() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState("");
    const [error, setError] = useState(null);

    async function add(user) {
        const response = await UserService.add(user);
        if (response.error) {
            setError(response.message);
            return;
        }
        navigate(RoutesNames.USER_OVERVIEW);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        add({
            username: data.get("username"),
            password: data.get("password"),
            email: data.get("email"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            createdAt: moment.utc(data.get("createdAt")),
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
            <h1 className="text-xl font-bold mb-4">Add new user</h1>
            {error && (
                <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                        Created At
                    </label>
                    <input
                        type="date"
                        name="createdAt"
                        id="createdAt"
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to={RoutesNames.USER_OVERVIEW} className="bg-red-500 text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-red-700">
                        Cancel
                    </Link>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full font-semibold">
                        Add new
                    </button>
                </div>
            </form>
        </div>
    );
}
