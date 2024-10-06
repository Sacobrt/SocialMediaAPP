import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/PostService";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import { MdCancel, MdFormatListBulletedAdd } from "react-icons/md";

export default function PostsAdd() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState(0);

    async function getUsers() {
        const response = await UserService.get();
        setUsers(response);
        setUserID(response[0].id);
    }

    useEffect(() => {
        getUsers();
    }, []);

    async function add(e) {
        const response = await Service.add(e);
        if (response.error) {
            setError(response.message);
            return;
        }
        navigate(RoutesNames.POST_OVERVIEW);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(localDate.getTime() - offset * 60 * 1000).toISOString().slice(0, -1);

        add({
            userID: userID,
            content: data.get("content"),
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
        <div className="container mx-auto max-w-3xl px-4 py-6">
            {error && (
                <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex items-center mb-4">
                    <div className="w-full">
                        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Make a Post</h1>
                        <div className="mb-4">
                            <label htmlFor="userID" className="font-medium text-gray-800">
                                Posting as: <span className="text-red-500 font-bold">*</span>
                            </label>
                            <select
                                id="userID"
                                name="userID"
                                onChange={(e) => setUserID(e.target.value)}
                                className="mt-1 block w-full py-2 pl-3 pr-10 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-0"
                            >
                                {users &&
                                    users.map((user, index) => (
                                        <option key={index} value={user.id}>
                                            {user.username}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <textarea
                        name="content"
                        id="content"
                        placeholder="What's on your mind?"
                        rows="4"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-0 text-lg"
                    />
                </div>

                <div className="flex justify-between items-center mt-6">
                    <Link
                        to={RoutesNames.POST_OVERVIEW}
                        className="flex items-center bg-red-400 gap-2 text-gray-100 px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
                    >
                        <MdCancel className="text-xl" />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex items-center bg-blue-600 gap-2 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                        <MdFormatListBulletedAdd className="text-xl" />
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}
