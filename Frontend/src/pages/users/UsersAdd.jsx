import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

export default function UsersAdd() {
    const navigate = useNavigate();
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

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(localDate.getTime() - offset * 60 * 1000).toISOString().slice(0, -1);

        add({
            username: data.get("username"),
            password: data.get("password"),
            email: data.get("email"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            createdAt: formattedDate,
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

    return (
        <div className="container mx-auto max-w-3xl px-6 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Create New Account</h1>

            {error && (
                <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="mt-2 block w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-0"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
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
                            className="mt-2 block w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-0"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
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
                    <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold flex items-center hover:bg-blue-700 transition">
                        <RiUserFollowLine className="inline mr-2" />
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}
