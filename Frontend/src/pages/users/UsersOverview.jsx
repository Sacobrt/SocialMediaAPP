import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { APP_URL, RoutesNames } from "../../constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import defaultImage from "../../assets/defaultImage.png";
import { Link } from "react-router-dom";

export default function UsersOverview() {
    const [users, setUsers] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState("");

    async function getUsers() {
        const response = await UserService.getPagination(page, condition);

        if (response.error) {
            setError(response.message);
            return;
        }
        if (response.message.length == 0) {
            setPage(page - 1);
            return;
        }

        setUsers(response.message);
        setIsLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, [page, condition]);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [error]);

    async function removeAsync(id) {
        const response = await UserService.remove(id);
        if (response.error) {
            setError(response.message);
            return;
        }
        getUsers();
    }

    function removeUser(id) {
        removeAsync(id);
    }

    function checkName(name) {
        if (name == null) return " ";
        if (name == "") return " ";
        return name;
    }

    function image(user) {
        if (user.image != null) {
            return APP_URL + user.image + `?${Date.now()}`;
        }
        return defaultImage;
    }

    function changeCondition(e) {
        setPage(1);
        setCondition(e.nativeEvent.srcElement.value);
        setUsers([]);
    }
    function increasePage() {
        setPage(page + 1);
    }

    function reducePage() {
        if (page == 1) {
            return;
        }
        setPage(page - 1);
    }

    return (
        <div className="container mx-auto py-8 px-5">
            {isLoading && (
                <div className="flex justify-center items-center pb-4">
                    <div className="inline-flex flex-col items-center space-y-3 py-4 px-8 bg-gray-900 rounded-lg shadow-2xl">
                        <div className="w-6 h-6 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
                        <div className="text-white font-mono text-xl tracking-wide animate-pulse">Loading content, please wait...</div>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-100">Users</h2>

                        {/* Search and Pagination */}
                        <div className="flex flex-row justify-between gap-4">
                            <div className="relative w-full sm:w-1/3">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search..."
                                    maxLength={32}
                                    onKeyUp={changeCondition}
                                    className="w-fit p-2 pl-10 bg-gray-800 text-white border border-gray-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>

                            {users && users.length > 0 && (
                                <div className="flex items-center justify-center space-x-3">
                                    <button onClick={reducePage} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                    </button>
                                    <span className="text-lg text-gray-300">{page}</span>
                                    <button onClick={increasePage} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        <Link to={RoutesNames.USER_NEW} className="btn-main mt-2 sm:mt-0">
                            <FaUsers size={16} className="sm:mr-2" /> <span>Create Account</span>
                        </Link>
                    </div>

                    {error && <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold shadow-md">{error}</div>}

                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <div
                                    key={index}
                                    className="relative bg-gray-900 border border-gray-600 rounded-2xl p-6 flex flex-col items-center text-center shadow-neon hover:shadow-neon-lg transition-shadow duration-300 ease-in-out"
                                >
                                    <div className="profile-avatar w-24 h-24 mb-4 rounded-full overflow-hidden">
                                        <img src={image(user)} alt={user.username} className="object-cover w-full h-full" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-200">{user.username}</h3>
                                    <p className="text-sm text-gray-400 mb-2">{user.email}</p>
                                    <p className="text-xs text-teal-400">
                                        {checkName(user.firstName)} {checkName(user.lastName)}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        <FaRegCalendarAlt />
                                        {`Joined ${new Date(user.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}`}
                                    </p>
                                    <div className="mt-4 flex space-x-2">
                                        <Link className="btn-edit" to={`/users/${user.id}`}>
                                            <MdDriveFileRenameOutline size={20} />
                                        </Link>
                                        <button className="btn-delete" onClick={() => removeUser(user.id)} title="Delete User">
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-400 text-xl">No users found!</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
