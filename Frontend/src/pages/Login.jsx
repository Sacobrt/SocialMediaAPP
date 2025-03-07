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
        <div className="max-w-lg grid justify-center mx-auto mt-72 p-10 bg-gray-900 bg-opacity-80 rounded-md shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl transform">
            <img
                className="rounded-lg hover:rotate-2 transition-all duration-1000 ease-in-out hover:scale-125"
                src="logo.png"
                width={400}
                height={400}
                alt="Social Media Logo"
            />
            <div className="mt-5 grid gap-2 text-gray-700">
                <p className="bg-gradient-to-r from-blue-100 to-gray-100 p-3 rounded-md text-center font-medium shadow-inner">
                    <strong>Email:</strong> demo@demo.com
                </p>
                <p className="bg-gradient-to-r from-blue-100 to-gray-100 p-3 rounded-md text-center font-medium shadow-inner">
                    <strong>Password:</strong> demo
                </p>
            </div>
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="text-sm font-bold text-gray-200 tracking-wide">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="demo@demo.com"
                        maxLength={255}
                        required
                        className="w-full p-4 bg-gray-700 text-gray-200 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 placeholder-gray-400 focus:shadow-lg"
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="password" className="text-sm font-bold text-gray-200 tracking-wide">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        className="w-full p-4 bg-gray-700 text-gray-200 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 placeholder-gray-400 focus:shadow-lg"
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
