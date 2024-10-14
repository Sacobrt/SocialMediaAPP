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
        <div className="container mx-auto max-w-3xl mt-10 px-5 py-10 rounded-3xl shadow-2xl border-2 border-gray-600">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ">
                Edit Post
            </h1>

            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold animate-shake">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="userID" className="block text-sm font-medium text-gray-300 mb-2">
                            User <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            value={usersID}
                            onChange={(e) => setUsersID(e.target.value)}
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
                        <label htmlFor="createdAt" className="block text-sm font-medium text-gray-300 mb-2">
                            Created At <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="createdAt"
                            id="createdAt"
                            defaultValue={posts.createdAt}
                            className="block w-full px-4 py-3 border-2 border-transparent bg-gray-700 text-white rounded-full focus:border-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                        Post <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Update your post content here..."
                        rows="6"
                        defaultValue={posts.content}
                        className="block w-full px-4 py-3 border-2 border-transparent bg-gray-700 text-white rounded-2xl focus:border-blue-500 focus:outline-none resize-none transition-all"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <Link to={RoutesNames.POST_OVERVIEW} className="btn-cancel">
                        <MdCancel className="lg:mr-2" />
                        <span>Cancel</span>
                    </Link>
                    <button type="submit" className="btn-main">
                        <MdDriveFileRenameOutline className="lg:mr-2" />
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
