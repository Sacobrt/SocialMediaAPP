import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/CommentService";
import PostService from "../../services/PostService";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaComments } from "react-icons/fa";

export default function CommentsAdd() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);
    const [userID, setUsersID] = useState(0);

    const [posts, setPosts] = useState([]);
    const [postID, setPostsID] = useState([]);

    async function getUsers() {
        const response = await UserService.get();
        setUsers(response);
        setUsersID(response[0].id);
    }

    async function getPosts() {
        const response = await PostService.get();
        setPosts(response);
        setPostsID(response[0].id);
    }

    async function getData() {
        await getUsers();
        await getPosts();
    }

    useEffect(() => {
        getData();
    }, []);

    async function add(user) {
        const response = await Service.add(user);
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
        const formattedDate = new Date(localDate.getTime() - offset * 60 * 1000).toISOString().slice(0, -1);

        add({
            userID: userID,
            postID: postID,
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
        <div className="max-w-2xl mx-auto mt-10 p-8 rounded-3xl border-2 border-gray-600">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Leave a Comment</h1>

            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold animate-bounce">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="userID" className="block text-sm font-medium text-gray-300 mb-2">
                            Posting as: <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            onChange={(e) => setUsersID(e.target.value)}
                            className="block w-full px-4 py-3 bg-gray-700 border-2 border-transparent text-white rounded-full focus:border-blue-500 focus:outline-none transition-all"
                        >
                            {users.map((user, index) => (
                                <option key={index} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="postID" className="block text-sm font-medium text-gray-300 mb-2">
                            Select a Post: <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="postID"
                            name="postID"
                            onChange={(e) => setPostsID(e.target.value)}
                            className="block w-full px-4 py-3 bg-gray-700 border-2 border-transparent text-white rounded-full focus:border-blue-500 focus:outline-none transition-all"
                        >
                            {posts.map((post, index) => (
                                <option key={index} value={post.id}>
                                    {post.content.length > 60 ? post.content.slice(0, 60) + "..." : post.content}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                            Your Comment <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows="4"
                            placeholder="Write your comment..."
                            className="block w-full text-white py-3 px-4 bg-gray-700 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:outline-none resize-none transition-all"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Link to={RoutesNames.COMMENT_OVERVIEW} className="btn-cancel">
                        <MdCancel />
                        <span>Cancel</span>
                    </Link>
                    <button type="submit" className="btn-main">
                        <FaComments />
                        <span>Post Comment</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
