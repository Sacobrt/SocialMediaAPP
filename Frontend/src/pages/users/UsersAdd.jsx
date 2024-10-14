import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import moment from "moment";

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
        const formattedBirthDate = new Date(moment.utc(data.get("birthDate")) - offset * 60 * 1000).toISOString().slice(0, -1);

        add({
            username: data.get("username"),
            password: data.get("password"),
            email: data.get("email"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            birthDate: formattedBirthDate,
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
        <div className="container mx-auto border-2 border-gray-600 max-w-4xl px-6 py-12 shadow-xl glow-neon mt-12 rounded-3xl overflow-hidden">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ">
                Create New Account
            </h1>

            {error && (
                <div className="floating-notif bg-red-600 text-white p-5 rounded-lg mb-8 border-2 border-red-500 animate-bounce">
                    {error.map((errMsg, index) => (
                        <p key={index} className="text-sm mb-1 last:mb-0">
                            {errMsg}
                        </p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { field: "username", label: "Username" },
                        { field: "email", label: "Email" },
                        { field: "firstName", label: "First Name" },
                        { field: "lastName", label: "Last Name" },
                        { field: "password", label: "Password" },
                        { field: "birthDate", label: "Date of Birth" },
                    ].map(({ field, label }, index) => {
                        const isRequired = ["username", "email", "password"].includes(field);
                        return (
                            <div key={index}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
                                    {label}
                                    {isRequired && <span className="text-red-500"> *</span>}
                                </label>
                                <input
                                    type={field === "password" ? "password" : field === "birthDate" ? "date" : "text"}
                                    name={field}
                                    id={field}
                                    className="px-4 py-3 w-full bg-gray-700 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    required={isRequired}
                                />
                            </div>
                        );
                    })}
                </div>

                <hr className="my-10 border-1 border-gray-700" />

                <div className="flex justify-end space-x-4">
                    <Link to={RoutesNames.USER_OVERVIEW} className="btn-cancel">
                        <MdCancel className="lg:mr-2" />
                        Cancel
                    </Link>
                    <button type="submit" className="btn-main">
                        <RiUserFollowLine className="lg:mr-2" />
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}
