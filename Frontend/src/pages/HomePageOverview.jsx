import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Service from "../services/PostService";
import UserService from "../services/UserService";
import CommentService from "../services/CommentService";
import { IoIosClose } from "react-icons/io";
import getRelativeTime from "../hooks/getRelativeTime";
import defaultImage from "../assets/defaultImage.png";
import { APP_URL, RoutesNames } from "../constants";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { parseJwt } from "../hooks/parseJwt";
import { AuthContext } from "../components/AuthContext";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function HomePageOverview() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [activePost, setActivePost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { authToken } = useContext(AuthContext);

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
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
    const [currentUserID, setUserID] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            getData();

            const token = parseJwt(authToken);
            setUserID(token.UserID);
        }
    }, [isLoggedIn]);

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
              acc[user.id] = {
                  username: String(user.username).toLowerCase(),
                  fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "", // Fallback to empty string if firstName or lastName is missing
              };
              return acc;
          }, {})
        : {};

    const commentsMap = useMemo(() => {
        return Array.isArray(comments)
            ? comments.reduce((acc, comment) => {
                  if (!acc[comment.postID]) {
                      acc[comment.postID] = [];
                  }
                  acc[comment.postID].push(comment);
                  return acc;
              }, {})
            : {};
    }, [comments]);

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
            return APP_URL + userImage + `?${Date.now()}`;
        }
        return defaultImage;
    }

    const handleCommentSubmit = async (e, postId) => {
        e.preventDefault();

        const commentContent = newComments[postId];
        if (!commentContent || !commentContent.trim()) {
            return;
        }

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(localDate.getTime() - offset * 60 * 1000).toISOString().slice(0, -1);

        const commentData = {
            postID: postId,
            userID: currentUserID,
            content: commentContent,
            createdAt: formattedDate,
        };

        try {
            const response = await CommentService.add(commentData);
            if (response.message) {
                setComments((prevComments) => prevComments.map((comment) => (comment.id === commentData.id ? { ...comment, id: response.data.id } : comment)));
            } else {
                setError("Failed to add comment.");
            }
            setNewComments({});
            await getComments();
        } catch (error) {
            console.error("Error posting comment", error);
            setError("Failed to add comment.");
        }
    };

    async function removeAsync(id) {
        const response = await CommentService.remove(id);
        if (response.error) {
            setError(response.message);
            return;
        }
        getComments();
    }

    function removeCommentId(id) {
        removeAsync(id);
    }

    const [expandedComments, setExpandedComments] = useState({});
    const [expandedModalComments, setExpandedModalComments] = useState({});

    // Function to toggle the expanded state for a specific comment
    const toggleExpand = (commentId) => {
        setExpandedComments((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const toggleExpandModal = (commentId) => {
        setExpandedModalComments((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    return (
        <div className="container mx-auto py-8 px-4">
            {isLoggedIn ? (
                <>
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
                        {posts
                            .slice()
                            .reverse()
                            .map((post, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 shadow-xl rounded-2xl p-6 transition-all duration-300 transform hover:scale-102 hover:shadow-2xl text-white"
                                >
                                    {/* Post Header */}
                                    <div className="flex items-center mb-4">
                                        <div className="profile-avatar w-20 h-20 rounded-full overflow-hidden">
                                            <img src={image(usernamesImageMap[post.userID])} alt="User Profile Picture" className="object-cover w-full h-full" />
                                        </div>
                                        <div className="flex flex-col ml-4">
                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm font-bold text-teal-400">{usernamesMap[post.userID]?.fullName}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">@{usernamesMap[post.userID]?.username || "Loading..."}</span>
                                            <time className="text-[11px] text-gray-400">{getRelativeTime(post.createdAt)}</time>
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
                                                    .slice()
                                                    .reverse()
                                                    .slice(0, 3)
                                                    .map((comment, idx) => {
                                                        const isExpanded = expandedComments[comment.id] || false; // Check if the comment is expanded
                                                        const isTruncated = comment.content.length > 150; // Customize this threshold (150 chars in this case)

                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="flex items-start bg-gray-700 p-4 rounded-lg"
                                                                onClick={() => toggleExpand(comment.id)}
                                                            >
                                                                <div className="profile-avatar w-10 h-10 mb-4 rounded-full overflow-hidden">
                                                                    <img
                                                                        src={image(usernamesImageMap[comment.userID])}
                                                                        alt="User Profile Picture"
                                                                        className="object-cover w-full h-full"
                                                                    />
                                                                </div>
                                                                <div className="ml-3 flex-1">
                                                                    <div className="relative flex justify-between items-start">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm text-teal-400 font-semibold">
                                                                                {usernamesMap[comment.userID]?.fullName}
                                                                            </span>
                                                                            <span className="text-xs text-gray-400">
                                                                                @{usernamesMap[comment.userID]?.username || "Loading..."}
                                                                            </span>
                                                                            <time className="text-[11px] text-gray-400">{getRelativeTime(comment.createdAt)}</time>
                                                                        </div>

                                                                        {/* Delete button for comments by the logged-in user */}
                                                                        {comment.userID == currentUserID && (
                                                                            <button
                                                                                className="btn-delete absolute -right-3 -top-3"
                                                                                onClick={() => removeCommentId(comment.id)}
                                                                                title="Delete Comment"
                                                                            >
                                                                                <RiDeleteBin6Line size={16} />
                                                                            </button>
                                                                        )}
                                                                    </div>

                                                                    {/* Comment content with expandable option */}
                                                                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                                                                        {isExpanded ? comment.content : comment.content.slice(0, 150)}{" "}
                                                                        {/* Show full content if expanded */}
                                                                        {isTruncated && !isExpanded && "..."} {/* Show ellipsis if truncated */}
                                                                    </p>

                                                                    {/* "Read more" / "Read less" button */}
                                                                    {isTruncated && (
                                                                        <button className="text-xs text-teal-400 mt-1 focus:outline-none">
                                                                            {isExpanded ? "Read less" : "Read more"}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                            {commentsMap[post.id].length > 3 && (
                                                <button className="mt-4 w-fit text-white text-sm font-medium" onClick={() => openModal(post.id)}>
                                                    View all comments ({commentsMap[post.id].length})
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {/* Comment form to add a new comment for the specific post */}
                                    <div className="mt-2">
                                        <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                                            <textarea
                                                className="w-full p-2 bg-transparent text-sm text-gray-200 border-2 rounded-md border-gray-600"
                                                rows="3"
                                                placeholder="Leave a comment..."
                                                value={newComments[post.id] || ""}
                                                onChange={(e) => setNewComments({ newComments, [post.id]: e.target.value })}
                                            />
                                            <button type="submit" className="btn-main mt-1">
                                                Comment
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 bg-gray-950 bg-opacity-75 backdrop-blur-lg flex items-center justify-center z-50">
                            <div
                                ref={modalRef}
                                className="relative w-full max-w-2xl h-[85vh] bg-gray-900 text-white rounded-3xl shadow-neon overflow-y-auto transform scale-95 transition-transform duration-500 ease-out"
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
                                            className="w-16 h-16 rounded-full overflow-hidden"
                                        />
                                        <div className="ml-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-lg font-bold text-teal-400">
                                                        {usernamesMap[posts.find((post) => post.id === activePost)?.userID]?.fullName}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-400">
                                                    @{usernamesMap[posts.find((post) => post.id === activePost)?.userID]?.username || "Loading..."}
                                                </span>
                                                <time className="text-sm text-gray-400">
                                                    {getRelativeTime(posts.find((post) => post.id === activePost)?.createdAt)}
                                                </time>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Post Content */}
                                    <div className="text-lg mb-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-900">
                                        {posts.find((post) => post.id === activePost)?.content}
                                    </div>

                                    {/* Comments Section */}
                                    <div className="h-full mt-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-900">
                                        <h3 className="text-lg font-semibold text-center pb-2 border-b border-purple-500 mb-4">Comments</h3>
                                        <ul>
                                            {commentsMap[activePost]
                                                ?.slice()
                                                .reverse()
                                                .map((comment, idx) => {
                                                    const isExpanded = expandedModalComments[comment.id] || false;
                                                    const isTruncated = comment.content.length > 150;

                                                    return (
                                                        <li key={idx} className="flex items-start" onClick={() => toggleExpandModal(comment.id)}>
                                                            <img
                                                                src={image(usernamesImageMap[comment.userID])}
                                                                alt="Commenter's Profile"
                                                                className="w-12 h-12 rounded-full shadow-sm overflow-hidden mr-2"
                                                            />
                                                            <div className="flex-1 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm mb-4">
                                                                <div className="grid items-center">
                                                                    <span className="text-md font-bold text-teal-400">
                                                                        {usernamesMap[comment.userID]?.fullName}
                                                                    </span>
                                                                    <span className="text-sm text-gray-400">
                                                                        @{usernamesMap[comment.userID]?.username || "Loading..."}
                                                                    </span>
                                                                    <time className="text-xs text-gray-400">{getRelativeTime(comment.createdAt)}</time>
                                                                </div>

                                                                {/* Comment content with expandable option */}
                                                                <p className="text-gray-300 mt-2">
                                                                    {isExpanded ? comment.content : comment.content.slice(0, 150)}{" "}
                                                                    {isTruncated && !isExpanded && "..."}
                                                                </p>

                                                                {/* "Read more" / "Read less" button */}
                                                                {isTruncated && (
                                                                    <button className="text-xs text-teal-400 mt-1 focus:outline-none">
                                                                        {isExpanded ? "Read less" : "Read more"}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center w-full py-8 px-10 rounded-lg shadow-lg bg-gray-900 bg-opacity-80 flex flex-col justify-center items-center">
                    <p className="text-lg font-medium text-gray-200 mb-4">
                        Sign in to connect, share ideas, and stay informed with the latest posts from our active members.
                    </p>
                    <button onClick={() => navigate(RoutesNames.LOGIN)} className="btn-main w-fit">
                        <div className="flex items-center gap-1.5">
                            <FaSignInAlt />
                            Sign In
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}
