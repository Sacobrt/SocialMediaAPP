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

        change({
            userID: data.get("userID"),
            content: data.get("content"),
            createdAt: moment.utc(data.get("createdAt")),
        });
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-xl font-bold mb-4">Change Post</h1>
            {error && (
                <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="userID" className="font-medium text-gray-800">
                            User <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            value={usersID}
                            onChange={(e) => setUsersID(e.target.value)}
                            className="mt-1 block w-full py-2 pl-3 pr-10 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        >
                            {users &&
                                users.map((user, index) => (
                                    <option key={index} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-4 col-span-1 md:col-span-2">
                        <label htmlFor="content" className="font-medium text-gray-700">
                            Post <span className="text-red-500 font-bold">*</span>
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            placeholder="Update your post content here..."
                            rows="4"
                            defaultValue={posts.content}
                            className="mt-1 block w-full py-2 pl-3 pr-5 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="createdAt" className="font-medium text-gray-700">
                            Created At <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                            type="date"
                            name="createdAt"
                            id="createdAt"
                            defaultValue={posts.createdAt}
                            className="mt-1 block w-full py-1.5 pl-3 pr-10 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-2 gap-4">
                    <Link
                        to={RoutesNames.POST_OVERVIEW}
                        className="bg-red-500 gap-2 flex items-center justify-center text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-red-700 transition duration-200"
                    >
                        <MdCancel />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-600 gap-2 flex items-center justify-center text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full font-semibold transition duration-200"
                    >
                        <MdDriveFileRenameOutline />
                        Change
                    </button>
                </div>
            </form>
        </div>
    );
}
