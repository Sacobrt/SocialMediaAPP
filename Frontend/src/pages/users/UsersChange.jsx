import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import moment from "moment";

export default function UsersChange() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    async function getUser() {
        const response = await UserService.getByID(routeParams.id);
        if (response.error) {
            setError(response.message);
            return;
        }
        response.message.createdAt = moment.utc(response.message.createdAt).format("yyyy-MM-DD");
        setUser(response.message);
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [error]);

    async function change(user) {
        const response = await UserService.change(routeParams.id, user);
        if (response.error) {
            setError(response.message);
            return;
        }
        navigate(RoutesNames.USER_OVERVIEW);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        change({
            username: data.get("username"),
            password: data.get("password"),
            email: data.get("email"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            createdAt: moment.utc(data.get("createdAt")),
        });
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-xl font-bold mb-4">Change user</h1>
            {error && <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        defaultValue={user.username}
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
                        required
                        defaultValue={user.password}
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
                        required
                        defaultValue={user.email}
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
                        defaultValue={user.firstName}
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
                        defaultValue={user.lastName}
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
                        defaultValue={user.createdAt}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to={RoutesNames.USER_OVERVIEW} className="bg-red-500 text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-red-700">
                        Cancel
                    </Link>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full font-semibold">
                        Change user
                    </button>
                </div>
            </form>
        </div>
    );
}
