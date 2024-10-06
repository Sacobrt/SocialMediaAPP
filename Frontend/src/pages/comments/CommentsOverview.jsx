import { useEffect, useState } from "react";
import Service from "../../services/CommentService";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import PostService from "../../services/PostService";
import { FaComments } from "react-icons/fa";
import getRelativeTime from "../../hook/getRelativeTime";

export default function CommentsOverview() {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    async function getComments() {
        const response = await Service.get();
        if (response.error) {
            setError(response.message);
        } else {
            setComments(response);
        }
    }

    async function getUsers() {
        const response = await UserService.get();
        if (response.error) {
            setError(response.message);
        } else {
            setUsers(response);
        }
    }

    async function getPosts() {
        const response = await PostService.get();
        if (response.error) {
            setError(response.message);
        } else {
            setPosts(response);
        }
    }

    async function getData() {
        await getUsers();
        await getPosts();
        await getComments();
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [error]);

    async function removeAsync(id) {
        const response = await Service.remove(id);
        if (response.error) {
            setError(response.message);
            return;
        }
        getComments();
    }

    function removeUser(id) {
        removeAsync(id);
    }

    const usernamesMap = Array.isArray(users)
        ? users.reduce((acc, user) => {
              acc[user.id] = user.username;
              return acc;
          }, {})
        : {};

    const postsMap = Array.isArray(posts)
        ? posts.reduce((i, post) => {
              i[post.id] = post.content;
              return i;
          }, {})
        : {};

    return (
        <div className="container mx-auto py-5 px-5">
            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="bg-green-500 p-4 rounded-full shadow-xl animate-bounce-slow text-white font-bold text-lg flex items-center space-x-3">
                        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Loading comments...</span>
                    </div>
                </div>
            )}

            {!isLoading && (
                <div>
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
                        <button
                            className="flex items-center justify-center gap-2 rounded-full bg-green-600 hover:bg-green-700 transition duration-200 cursor-pointer px-6 py-2 text-center text-white font-semibold shadow-lg"
                            onClick={() => navigate(RoutesNames.COMMENT_NEW)}
                        >
                            <FaComments />
                            <span className="hidden sm:inline">ADD COMMENT</span>
                        </button>
                    </div>

                    {error && <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">{error}</div>}

                    <div className="space-y-4">
                        {comments.length > 0 ? (
                            comments
                                .slice()
                                .reverse()
                                .map((i, index) => (
                                    <div key={index} className="bg-white shadow-md rounded-lg p-5 border-2 border-gray-300">
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full uppercase w-12 h-12 flex items-center justify-center text-lg font-bold text-white shadow-md">
                                                {usernamesMap[i.userID]?.charAt(0) || "?"}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs text-gray-400">{getRelativeTime(i.createdAt)}</div>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-lg font-medium text-gray-700">{usernamesMap[i.userID] || "Loading..."}</p>
                                                        <p className="text-xs text-gray-500">{postsMap[i.postID] || "Loading..."}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-800 mt-2">{i.content || "Loading..."}</p>
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => navigate(`/comments/${i.id}`)}
                                                title="Edit Comment"
                                            >
                                                <MdDriveFileRenameOutline size={20} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" onClick={() => removeUser(i.id)} title="Delete Comment">
                                                <RiDeleteBin6Line size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="text-center text-gray-500 py-10">
                                <p>No comments found.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
