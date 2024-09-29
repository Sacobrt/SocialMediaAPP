import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import moment from "moment";
import { RiUserFollowLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

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
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Change User</h1>
            {error && (
                <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            defaultValue={user.username}
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            defaultValue={user.password}
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={user.email}
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            defaultValue={user.firstName}
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
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
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                            Created At <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="date"
                            name="createdAt"
                            id="createdAt"
                            defaultValue={user.createdAt}
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <Link
                        to={RoutesNames.USER_OVERVIEW}
                        className="bg-red-500 gap-2 flex items-center justify-center text-white py-2 rounded-md text-center font-semibold hover:bg-red-700 transition duration-200"
                    >
                        <MdCancel />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 gap-2 flex items-center justify-center text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 w-full font-semibold"
                    >
                        <RiUserFollowLine />
                        Change
                    </button>
                </div>
            </form>
        </div>
    );
}
