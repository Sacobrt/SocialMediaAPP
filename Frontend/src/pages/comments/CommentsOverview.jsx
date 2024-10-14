import { useEffect, useState } from "react";
import Service from "../../services/CommentService";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { APP_URL, RoutesNames } from "../../constants";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import PostService from "../../services/PostService";
import { FaComments } from "react-icons/fa";
import getRelativeTime from "../../hook/getRelativeTime";
import defaultImage from "../../assets/defaultImage.png";

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

    const usernamesImageMap = Array.isArray(users)
        ? users.reduce((acc, user) => {
              acc[user.id] = user.image;
              return acc;
          }, {})
        : {};

    function image(userImage) {
        if (userImage != null) {
            return `${APP_URL}/${userImage}?${Date.now()}`;
        }
        return defaultImage;
    }

    const postsMap = Array.isArray(posts)
        ? posts.reduce((i, post) => {
              i[post.id] = post.content;
              return i;
          }, {})
        : {};

    return (
        <div className="container mx-auto py-8 px-5">
            {isLoading && (
                <div className="flex justify-center items-center pb-4">
                    <div className="inline-flex flex-col items-center space-y-3 py-4 px-8 bg-gray-900 rounded-lg shadow-2xl">
                        <div className="w-6 h-6 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
                        <div className="text-white font-mono text-xl tracking-wide animate-pulse">Loading content, please wait...</div>
                    </div>
                </div>
            )}

            {!isLoading && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-100">Comments</h2>
                        <button onClick={() => navigate(RoutesNames.COMMENT_NEW)} className="btn-main">
                            <FaComments size={20} className="lg:mr-2" />
                            <span className="hidden sm:inline">Add Comment</span>
                        </button>
                    </div>

                    {error && <div className="mb-5 bg-red-500 p-3 rounded-xl text-center text-white font-semibold animate-bounce">{error}</div>}

                    <div className="grid gap-6">
                        {comments.length > 0 ? (
                            comments
                                .slice()
                                .reverse()
                                .map((comment, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-transparent hover:border-blue-400 transition-colors"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="profile-avatar w-16 h-16 mb-4 rounded-full">
                                                    <img
                                                        src={image(usernamesImageMap[comment.userID])}
                                                        alt={usernamesMap[comment.userID].username}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm text-gray-400">{getRelativeTime(comment.createdAt)}</div>
                                                    <div className="flex-1 items-center">
                                                        <p className="text-lg font-medium text-gray-200">{usernamesMap[comment.userID] || "Loading..."}</p>
                                                        <p className="text-xs text-gray-500">{postsMap[comment.postID] || "Loading..."}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-gray-300 break-words">{comment.content}</p>
                                            <div className="flex justify-end space-x-2 mt-4">
                                                <button
                                                    className="text-blue-400 hover:text-blue-600 p-2 rounded-full transition-all"
                                                    onClick={() => navigate(`/comments/${comment.id}`)}
                                                    title="Edit Comment"
                                                >
                                                    <MdDriveFileRenameOutline size={20} />
                                                </button>
                                                <button
                                                    className="text-red-400 hover:text-red-600 p-2 rounded-full transition-all"
                                                    onClick={() => removeUser(comment.id)}
                                                    title="Delete Comment"
                                                >
                                                    <RiDeleteBin6Line size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-lg font-semibold">No comments found.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
