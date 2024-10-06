import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/CommentService";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdCancel, MdDriveFileRenameOutline } from "react-icons/md";
import PostService from "../../services/PostService";

export default function CommentsChange() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [comments, setComments] = useState({});
    const [commentContent, setCommentContent] = useState(0);
    const [error, setError] = useState();

    const [users, setUsers] = useState([]);
    const [usersID, setUsersID] = useState(0);

    const [posts, setPosts] = useState([]);
    const [postsID, setPostsID] = useState(0);

    async function getComments() {
        const response = await Service.getByID(routeParams.id);
        if (response.error) {
            setError(response.message);
            return;
        }
        response.message.createdAt = moment.utc(response.message.createdAt).format("yyyy-MM-DD");
        setComments(response.message);
        setCommentContent(response.message.content);
        setUsersID(response.message.userID);
        setPostsID(response.message.postID);
    }

    async function getPosts() {
        const response = await PostService.get();
        if (response.error) {
            setError(response.message);
            return;
        }
        setPosts(response);
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
        await getComments();
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

    async function change(comments) {
        const response = await Service.change(routeParams.id, comments);
        if (response.error) {
            setError(response.message);
            return;
        }
        navigate(RoutesNames.COMMENT_OVERVIEW);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(moment.utc(data.get("createdAt")) - offset * 60 * 1000).toISOString().slice(0, -1);

        change({
            userID: data.get("userID"),
            postID: data.get("postID"),
            content: commentContent,
            createdAt: formattedDate,
        });
    }

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Edit Comment</h1>

            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-md text-center text-white font-semibold">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="userID" className="text-gray-800 font-medium">
                            User <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            value={usersID}
                            onChange={(e) => setUsersID(e.target.value)}
                            className="mt-2 block w-full py-2 px-4 border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-0"
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
                        <label htmlFor="postID" className="text-gray-800 font-medium">
                            Post <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="postID"
                            name="postID"
                            value={postsID}
                            onChange={(e) => setPostsID(e.target.value)}
                            className="mt-2 block w-full py-2 px-4 border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-0"
                        >
                            {posts &&
                                posts.map((post, index) => (
                                    <option key={index} value={post.id}>
                                        {post.content.slice(0, 50)}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="content" className="text-gray-800 font-medium">
                            Comment <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            defaultValue={comments.content}
                            rows="5"
                            placeholder="Edit your comment..."
                            className="mt-2 block w-full py-3 px-4 border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-0"
                            onChange={(e) => setCommentContent(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="md:col-span-1">
                        <label htmlFor="createdAt" className="text-gray-800 font-medium">
                            Created At <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="createdAt"
                            id="createdAt"
                            defaultValue={comments.createdAt}
                            className="mt-2 block w-full py-2 px-4 border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-0"
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <Link
                        to={RoutesNames.COMMENT_OVERVIEW}
                        className="flex items-center bg-red-400 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-500 transition duration-300"
                    >
                        <MdCancel className="mr-2" />
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        <MdDriveFileRenameOutline className="mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
