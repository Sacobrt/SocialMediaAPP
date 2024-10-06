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
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Leave a Comment</h1>

            {error && (
                <div className="mb-4 bg-red-500 p-4 rounded-lg text-center text-white">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center">
                    <div className="w-full">
                        <label htmlFor="userID" className="font-medium text-gray-800">
                            Posting as: <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                            id="userID"
                            name="userID"
                            onChange={(e) => setUsersID(e.target.value)}
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

                <div className="flex items-center">
                    <div className="w-full">
                        <label htmlFor="userID" className="font-medium text-gray-800">
                            Select a Post: <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                            id="postID"
                            name="postID"
                            onChange={(e) => setPostsID(e.target.value)}
                            className="mt-1 block w-full py-2 pl-3 pr-10 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-0"
                        >
                            {posts &&
                                posts.map((post, index) => (
                                    <option key={index} value={post.id}>
                                        {post.content.length > 60 ? post.content.slice(0, 60) + "..." : post.content}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-md">
                    <textarea
                        id="content"
                        name="content"
                        rows="4"
                        placeholder="Write your comment..."
                        className="w-full text-gray-700 py-3 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-0"
                    ></textarea>
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
                        <FaComments className="mr-2" />
                        Post Comment
                    </button>
                </div>
            </form>
        </div>
    );
}
