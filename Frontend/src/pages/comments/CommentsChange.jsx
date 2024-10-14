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
        <div className="max-w-3xl mx-auto mt-10 p-8 rounded-3xl shadow-2xl border-2 border-gray-600">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Edit Comment
            </h1>

            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold animate-bounce">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="userID" className="text-sm font-medium text-gray-300">
                            User <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            value={usersID}
                            onChange={(e) => setUsersID(e.target.value)}
                            className="mt-2 block w-full py-3 px-4 border-2 border-transparent bg-gray-700 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                        >
                            {users.map((user, index) => (
                                <option key={index} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="postID" className="text-sm font-medium text-gray-300">
                            Post <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="postID"
                            name="postID"
                            value={postsID}
                            onChange={(e) => setPostsID(e.target.value)}
                            className="mt-2 block w-full py-3 px-4 border-2 border-transparent bg-gray-700 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                        >
                            {posts.map((post, index) => (
                                <option key={index} value={post.id}>
                                    {post.content.slice(0, 50)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="content" className="text-sm font-medium text-gray-300">
                            Comment <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            defaultValue={comments.content}
                            rows="5"
                            placeholder="Edit your comment..."
                            onChange={(e) => setCommentContent(e.target.value)}
                            className="mt-2 block w-full py-4 px-4 border-2 border-transparent bg-gray-700 text-white rounded-2xl focus:border-blue-500 focus:outline-none resize-none"
                        ></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="createdAt" className="text-sm font-medium text-gray-300">
                            Created At <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="createdAt"
                            name="createdAt"
                            defaultValue={comments.createdAt}
                            className="mt-2 block w-full py-3 px-4 border-2 border-transparent bg-gray-700 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Link to={RoutesNames.COMMENT_OVERVIEW} className="btn-cancel">
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
