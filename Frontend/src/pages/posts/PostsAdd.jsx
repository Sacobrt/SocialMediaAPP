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
        <div className="container mx-auto max-w-3xl mt-10 px-5 py-12 rounded-3xl border-2 border-gray-600">
            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold animate-bounce">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ">
                    Make a Post
                </h1>

                <div className="mb-6">
                    <label htmlFor="userID" className="block text-sm font-medium text-gray-300 mb-2">
                        Posting as: <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="userID"
                        name="userID"
                        onChange={(e) => setUserID(e.target.value)}
                        className="block w-full px-4 py-3 border-2 border-transparent bg-gray-700 text-white rounded-full focus:border-blue-500 focus:outline-none transition-all"
                    >
                        {users.map((user, index) => (
                            <option key={index} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Post <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="What's on your mind?"
                        rows="5"
                        className="w-full p-4 border-2 border-transparent bg-gray-700 text-white rounded-2xl focus:border-blue-500 focus:outline-none resize-none transition-all"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <Link to={RoutesNames.POST_OVERVIEW} className="btn-cancel">
                        <MdCancel className="lg:mr-2" />
                        <span>Cancel</span>
                    </Link>
                    <button type="submit" className="btn-main">
                        <MdFormatListBulletedAdd className="lg:mr-2" />
                        <span>Post</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
