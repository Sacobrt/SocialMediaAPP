import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdCancel, MdOutlineSaveAlt } from "react-icons/md";

export default function UsersChange() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [user, setUser] = useState({});
    const [error, setError] = useState();

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
            }, 5000);
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

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(moment.utc(data.get("createdAt")) - offset * 60 * 1000).toISOString().slice(0, -1);

        change({
            username: data.get("username"),
            password: data.get("password"),
            email: data.get("email"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            createdAt: formattedDate,
        });
    }

    return (
        <div className="container mx-auto max-w-3xl px-6 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Edit Profile</h1>

            {error && (
                <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full uppercase flex items-center justify-center text-5xl font-bold text-white shadow-md">
                        {user.username?.charAt(0) || "?"}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            defaultValue={user.username}
                            className="mt-2 block w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-0"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={user.email}
                            className="mt-2 block w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-0"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            defaultValue={user.firstName}
                            className="mt-2 block w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-0"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            defaultValue={user.lastName}
                            className="mt-2 block w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-0"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            defaultValue={user.password}
                            className="mt-2 block w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-0"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                            Account Created On
                        </label>
                        <input
                            type="date"
                            name="createdAt"
                            id="createdAt"
                            defaultValue={user.createdAt}
                            className="mt-2 block w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-0"
                            required
                        />
                    </div>
                </div>

                <hr className="my-8" />

                <div className="flex items-center justify-between">
                    <Link
                        to={RoutesNames.USER_OVERVIEW}
                        className="bg-red-400 items-center flex text-gray-100 py-2 px-6 rounded-lg font-semibold hover:bg-red-500 transition duration-300 ease-in-out"
                    >
                        <MdCancel className="inline mr-2" />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold flex items-center hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        <MdOutlineSaveAlt className="inline mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
