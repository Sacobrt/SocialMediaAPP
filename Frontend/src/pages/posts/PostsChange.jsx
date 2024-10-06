import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/PostService";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdCancel, MdDriveFileRenameOutline } from "react-icons/md";

export default function PostsChange() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [posts, setPosts] = useState({});
    const [users, setUsers] = useState([]);
    const [usersID, setUsersID] = useState(0);
    const [error, setError] = useState();

    async function getPosts() {
        const response = await Service.getByID(routeParams.id);
        if (response.error) {
            setError(response.message);
            return;
        }
        response.message.createdAt = moment.utc(response.message.createdAt).format("yyyy-MM-DD");
        setPosts(response.message);
        setUsersID(response.message.userID);
    }

    async function getUsers() {
        const response = await UserService.get();
        if (response.error) {
            setError(response.message);
            return;
        }
        setUsers(response);
    }

    async function getData() {
        await getPosts();
        await getUsers();
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [error]);

    async function change(e) {
        const response = await Service.change(routeParams.id, e);
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
        const formattedDate = new Date(moment.utc(data.get("createdAt")) - offset * 60 * 1000).toISOString().slice(0, -1);

        change({
            userID: data.get("userID"),
            content: data.get("content"),
            createdAt: formattedDate,
        });
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

            {error && (
                <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="userID" className="font-medium text-gray-700">
                            User <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            value={usersID}
                            onChange={(e) => setUsersID(e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-0"
                        >
                            {users &&
                                users.map((user, index) => (
                                    <option key={index} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="createdAt" className="font-medium text-gray-700">
                            Created At <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="createdAt"
                            id="createdAt"
                            defaultValue={posts.createdAt}
                            className="mt-1 block w-full py-2 px-3 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-0"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="content" className="font-medium text-gray-700">
                        Post <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Update your post content here..."
                        rows="6"
                        defaultValue={posts.content}
                        className="mt-1 block w-full py-3 px-4 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-0"
                    />
                </div>

                <div className="flex justify-between items-center mt-6">
                    <Link
                        to={RoutesNames.POST_OVERVIEW}
                        className="flex items-center justify-center bg-red-400 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-500 transition duration-200"
                    >
                        <MdCancel className="mr-2" />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-semibold transition duration-200"
                    >
                        <MdDriveFileRenameOutline className="mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
