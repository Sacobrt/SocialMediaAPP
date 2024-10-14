import { useEffect, useRef, useState } from "react";
import Service from "../services/PostService";
import UserService from "../services/UserService";
import CommentService from "../services/CommentService";
import { IoIosClose, IoIosCloseCircle } from "react-icons/io";
import getRelativeTime from "../hook/getRelativeTime";
import defaultImage from "../assets/defaultImage.png";
import { APP_URL } from "../constants";

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

    return (
        <div className="container mx-auto py-8 px-4">
            {isLoading && (
                <div className="flex justify-center items-center pb-4">
                    <div className="inline-flex flex-col items-center space-y-3 py-4 px-8 bg-gray-900 rounded-lg shadow-2xl">
                        <div className="w-6 h-6 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
                        <div className="text-white font-mono text-xl tracking-wide animate-pulse">Loading content, please wait...</div>
                    </div>
                </div>
            )}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {!isLoading && error && <div className="col-span-full bg-red-500 py-4 px-6 rounded-xl text-center text-white font-bold mb-6">{error}</div>}
                {posts.reverse().map((post, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 shadow-xl rounded-2xl p-6 transition-all duration-300 transform hover:scale-102 hover:shadow-2xl text-white"
                    >
                        {/* Post Header */}
                        <div className="flex items-center mb-4">
                            <div className="profile-avatar w-20 h-20 mb-4 rounded-full">
                                <img src={image(usernamesImageMap[post.userID])} alt="User Profile Picture" className="object-cover w-full h-full" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-bold">{usernamesMap[post.userID] || "Loading..."}</h2>
                                <time className="text-sm text-gray-400">{getRelativeTime(post.createdAt)}</time>
                            </div>
                        </div>

                        {/* Post Content */}
                        <p className="text-gray-200 mb-4 text-lg">{post.content}</p>

                        {/* Comments Section */}
                        {commentsMap[post.id] && commentsMap[post.id].length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-sm font-semibold mb-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                                    Comments
                                </h3>
                                <div className="space-y-3">
                                    {commentsMap[post.id]
                                        .reverse()
                                        .slice(0, 3)
                                        .map((comment, idx) => (
                                            <div key={idx} className="flex items-start bg-gray-700 p-4 rounded-lg">
                                                <div className="profile-avatar w-10 h-10 mb-4 rounded-full">
                                                    <img
                                                        src={image(usernamesImageMap[comment.userID])}
                                                        alt="User Profile Picture"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold">{usernamesMap[comment.userID]}</span>
                                                        <span className="text-xs text-gray-500">{getRelativeTime(comment.createdAt)}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-300">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                {commentsMap[post.id].length > 3 && (
                                    <button
                                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-full text-sm font-medium"
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

            {showModal && (
                <div className="fixed inset-0 bg-gray-950 bg-opacity-75 backdrop-blur-lg flex items-center justify-center z-50">
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-2xl h-[85vh] bg-gray-900 text-white rounded-3xl shadow-neon overflow-hidden transform scale-95 transition-transform duration-500 ease-out"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 text-white bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out"
                        >
                            <IoIosClose className="w-6 h-6" />
                        </button>

                        {/* Modal Content */}
                        <div className="p-8 h-full flex flex-col">
                            {/* Post Header */}
                            <div className="flex items-center mb-6">
                                <img
                                    src={image(usernamesImageMap[posts.find((post) => post.id === activePost)?.userID])}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full shadow-outline ring-2 ring-offset-2 ring-blue-500 object-cover"
                                />
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-white">
                                        {usernamesMap[posts.find((post) => post.id === activePost)?.userID]}
                                    </h2>
                                    <p className="text-xs text-gray-400">{getRelativeTime(posts.find((post) => post.id === activePost)?.createdAt)}</p>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="text-lg mb-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-900">
                                {posts.find((post) => post.id === activePost)?.content}
                            </div>

                            {/* Comments Section */}
                            <div className="h-full mt-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-900">
                                <h3 className="text-lg font-semibold text-center pb-2 border-b border-purple-500 mb-4">Comments</h3>
                                <ul className="space-y-4">
                                    {commentsMap[activePost]?.map((comment, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <img
                                                src={image(usernamesImageMap[comment.userID])}
                                                alt="Commenter's Profile"
                                                className="w-12 h-12 rounded-full shadow-sm ring-1 ring-blue-500 object-cover mr-4"
                                            />
                                            <div className="flex-grow bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-semibold">{usernamesMap[comment.userID]}</span>
                                                    <span className="text-xs text-gray-500">{getRelativeTime(comment.createdAt)}</span>
                                                </div>
                                                <p className="text-gray-300">{comment.content}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
