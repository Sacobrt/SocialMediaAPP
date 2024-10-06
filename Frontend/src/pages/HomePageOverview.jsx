import { useEffect, useRef, useState } from "react";
import Service from "../services/PostService";
import UserService from "../services/UserService";
import CommentService from "../services/CommentService";
import { IoIosCloseCircle } from "react-icons/io";
import getRelativeTime from "../hook/getRelativeTime";

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
            document.body.style.overflow = "hidden";
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
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
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    {error && <div className="mb-5 bg-red-500 p-4 rounded-lg text-center text-white font-semibold">{error}</div>}
                    {posts.reverse().map((post, index) => (
                        <div key={index} className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out text-white">
                            {/* Header */}
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full uppercase w-12 h-12 flex items-center justify-center text-lg font-bold text-white shadow-md">
                                    {usernamesMap[post.userID]?.charAt(0) || "?"}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{usernamesMap[post.userID] || "Loading..."}</div>
                                    <div className="text-sm text-gray-400">{getRelativeTime(post.createdAt)}</div>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="text-gray-300 text-lg mb-4">{post.content || "Loading..."}</div>

                            {/* Comments Section - only show if there are comments */}
                            {commentsMap[post.id] && commentsMap[post.id].length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-sm leading-tight text-gray-50 mb-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg p-0.5 text-center">
                                        Comments
                                    </h3>

                                    <ul className="space-y-2">
                                        {commentsMap[post.id]
                                            .reverse()
                                            .slice(0, 3)
                                            .map((comment, idx) => (
                                                <li
                                                    key={idx}
                                                    className="bg-gray-700 border border-gray-600 p-4 rounded-lg shadow-md flex items-start transition-shadow duration-300 ease-in-out hover:shadow-lg"
                                                >
                                                    <div className="mr-4 bg-gradient-to-r from-green-400 to-teal-400 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold text-white shadow-md">
                                                        {usernamesMap[comment.userID]?.charAt(0) || "?"}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between mb-1">
                                                            <div className="font-semibold text-white">{usernamesMap[comment.userID] || "Loading..."}</div>
                                                            <div className="text-xs text-gray-400">{getRelativeTime(comment.createdAt)}</div>
                                                        </div>
                                                        <p className="text-gray-300">{comment.content}</p>
                                                    </div>
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
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed p-4 inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
                    <div
                        ref={modalRef}
                        className="relative bg-gray-800 text-white rounded-lg shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center pb-4 place-items-center border-b border-gray-700">
                            <h3 className="text-xl font-semibold text-white text-center flex-1">
                                Post {usernamesMap[posts.find((post) => post.id === activePost)?.userID] || "?"}
                            </h3>
                            <IoIosCloseCircle
                                className="text-red-400 w-8 h-8 cursor-pointer hover:text-opacity-70 transition duration-300 ease-in-out"
                                onClick={closeModal}
                            />
                        </div>

                        {/* Post Content */}
                        <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md flex items-start">
                            <div className="mr-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold text-white shadow-md">
                                {usernamesMap[posts.find((post) => post.id === activePost)?.userID]?.charAt(0) || "?"}
                            </div>
                            <div>
                                <div className="font-semibold text-white">{usernamesMap[posts.find((post) => post.id === activePost)?.userID] || "Loading..."}</div>
                                <div className="text-sm text-gray-400">
                                    {new Date(posts.find((post) => post.id === activePost)?.createdAt).toLocaleDateString() || "Just now"}
                                </div>
                                <p className="mt-2 text-white text-base">{posts.find((post) => post.id === activePost)?.content || "Loading post content..."}</p>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="overflow-y-auto mt-4 space-y-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <h3 className="font-semibold leading-tight text-gray-200 mb-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg p-1 text-center text-sm">
                                Comments
                            </h3>
                            <ul className="space-y-4">
                                {commentsMap[activePost]?.map((comment, idx) => (
                                    <li key={idx} className="bg-gray-700 border border-gray-600 p-4 rounded-lg shadow-md flex items-start">
                                        {/* Avatar */}
                                        <div className="mr-4 bg-gradient-to-r from-green-400 to-teal-400 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold text-white shadow-md">
                                            {usernamesMap[comment.userID]?.charAt(0) || "?"}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <div className="font-semibold text-white">{usernamesMap[comment.userID] || "Loading..."}</div>
                                                <div className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString() || "Just now"}</div>
                                            </div>
                                            <p className="text-gray-300">{comment.content}</p>
                                        </div>
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
