import { useEffect, useRef, useState } from "react";
import Service from "../../services/PostService";
import UserService from "../../services/UserService";
import CommentService from "../../services/CommentService";
import { IoIosCloseCircle } from "react-icons/io";

export default function HomePageOverview() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [activePost, setActivePost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const modalRef = useRef();

    async function getPosts() {
        const response = await Service.get();
        if (response.error) {
            setError(response.message);
        } else {
            setPosts(response);
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

    async function getComments() {
        const response = await CommentService.get();
        if (response.error) {
            setError(response.message);
        } else {
            setComments(response);
        }
    }

    async function getData() {
        await getPosts();
        await getUsers();
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

    const usernamesMap = Array.isArray(users)
        ? users.reduce((acc, user) => {
              acc[user.id] = user.username;
              return acc;
          }, {})
        : {};

    const commentsMap = Array.isArray(comments)
        ? comments.reduce((acc, comment) => {
              if (!acc[comment.postID]) {
                  acc[comment.postID] = [];
              }
              acc[comment.postID].push(comment);
              return acc;
          }, {})
        : {};

    const openModal = (postID) => {
        setActivePost(postID);
        setShowModal(true);
    };

    const closeModal = () => {
        setActivePost(null);
        setShowModal(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    return (
        <div className="container mx-auto py-8 px-4">
            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-xl animate-bounce-slow text-white font-bold text-lg flex items-center space-x-3">
                        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Loading content, please wait...</span>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                    {error && <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">{error}</div>}
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts
                            .slice()
                            .reverse()
                            .map((post, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                                    {/* Header */}
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full uppercase w-12 h-12 flex items-center justify-center text-lg font-bold text-white shadow-md">
                                            {usernamesMap[post.userID]?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{usernamesMap[post.userID] || "Loading..."}</div>
                                            <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString() || "Just now"}</div>
                                        </div>
                                    </div>

                                    {/* Post Content */}
                                    <div className="text-gray-800 text-lg mb-4">{post.content || "Loading..."}</div>

                                    {/* Comments Section */}
                                    <div>
                                        <h3 className="font-semibold text-sm leading-tight text-gray-50 mb-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg p-0.5 text-center">
                                            Comments
                                        </h3>

                                        {commentsMap[post.id] && commentsMap[post.id].length > 0 ? (
                                            <>
                                                <ul className="space-y-2">
                                                    {commentsMap[post.id].slice(0, 3).map((comment, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="bg-gray-100 border border-gray-200 p-4 rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
                                                        >
                                                            <div className="flex justify-between mb-2">
                                                                <div className="font-semibold text-gray-900">{usernamesMap[comment.userID] || "Loading..."}</div>
                                                                <div className="text-xs text-gray-500">
                                                                    {new Date(comment.createdAt).toLocaleDateString() || "Just now"}
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-700">{comment.content}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {commentsMap[post.id].length > 3 && (
                                                    <button
                                                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                                                        onClick={() => openModal(post.id)}
                                                    >
                                                        View all comments ({commentsMap[post.id].length})
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-gray-500">No comments yet.</p>
                                        )}
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="text-center text-gray-500">No posts found.</div>
                    )}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
                    <div
                        ref={modalRef}
                        className="relative bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full h-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                            <h3 className="text-2xl font-semibold text-gray-800">Comments for Post</h3>
                            <IoIosCloseCircle className="text-red-500 w-8 h-8 cursor-pointer" onClick={closeModal} />
                        </div>

                        {/* Post Content */}
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                            <p className="text-gray-800 text-base">{posts.find((post) => post.id === activePost)?.content || "Loading post content..."}</p>
                        </div>

                        {/* Comments Section */}
                        <div className="overflow-y-auto mt-4 space-y-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <h3 className="font-semibold leading-tight text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg p-0.5 shadow-lg text-center text-sm">
                                Comments
                            </h3>
                            <ul className="space-y-4">
                                {commentsMap[activePost]?.map((comment, idx) => (
                                    <li
                                        key={idx}
                                        className="bg-gray-100 border border-gray-200 p-4 rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
                                    >
                                        <div className="flex justify-between mb-1">
                                            <div className="font-semibold text-gray-900">{usernamesMap[comment.userID] || "Loading..."}</div>
                                            <div className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString() || "Just now"}</div>
                                        </div>
                                        <p className="text-gray-700">{comment.content}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
