import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserService from "../../services/UserService";
import moment from "moment";
import { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

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
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Add New User</h1>
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
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mb-4">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="mt-1 block w-full py-3 pl-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="createdAt" className="text-sm font-medium text-gray-700">
                            Created At <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="date"
                            name="createdAt"
                            id="createdAt"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
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
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
