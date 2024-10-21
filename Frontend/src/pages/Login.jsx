import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RoutesNames } from "../constants";
import { MdCancel } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";

export default function Login() {
    const { login } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        login({
            email: data.get("email"),
            password: data.get("password"),
        });
    }

    return (
        <div className="max-w-lg mx-auto mt-12 p-10 bg-gray-800 bg-opacity-80 rounded-xl shadow-xl transition-all duration-500 ease-in-out hover:shadow-2xl transform">
            <p className="mb-6 text-center text-md text-gray-200 font-semibold tracking-wide">Welcome! Use the credentials below to log in:</p>
            <p className="mb-2 text-sm text-gray-700 bg-gradient-to-r from-blue-100 to-gray-100 p-3 rounded-md text-center font-medium shadow-inner">
                <strong>Email:</strong> demo@demo.com
            </p>
            <p className="mb-8 text-sm text-gray-700 bg-gradient-to-r from-blue-100 to-gray-100 p-3 rounded-md text-center font-medium shadow-inner">
                <strong>Password:</strong> demo
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-200 tracking-wide">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="demo@demo.com"
                        maxLength={255}
                        required
                        className="w-full p-4 bg-gray-50 text-gray-800 border-none rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 placeholder-gray-400 focus:shadow-lg"
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-200 tracking-wide">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        className="w-full p-4 bg-gray-50 text-gray-800 border-none rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 placeholder-gray-400 focus:shadow-lg"
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <Link to={RoutesNames.HOME} className="btn-cancel">
                        <MdCancel />
                        <span>Cancel</span>
                    </Link>
                    <button type="submit" className="btn-main">
                        <FaSignInAlt />
                        Authorize
                    </button>
                </div>
            </form>
        </div>
    );
}
