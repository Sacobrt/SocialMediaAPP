import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Service from "../services/PostService";
import UserService from "../services/UserService";
import CommentService from "../services/CommentService";
import { IoIosClose } from "react-icons/io";
import getRelativeTime from "../hooks/getRelativeTime";
import defaultImage from "../assets/defaultImage.png";
import { APP_URL, RoutesNames } from "../constants";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { parseJwt } from "../hooks/parseJwt";
import { AuthContext } from "../components/AuthContext";
import { RiDeleteBin6Line } from "react-icons/ri";

import { convertToRaw } from "draft-js";

import draftToHtml from "draftjs-to-html";

import InfiniteScroll from "react-infinite-scroll-component";
import FollowerService from "../services/FollowerService";
import PostComment from "../components/PostComment";
import { MdOutlinePostAdd } from "react-icons/md";

export default function HomePageOverview() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});
    const [newComments, setNewComments] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [activePost, setActivePost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const modalRef = useRef();
    const [currentUserID, setUserID] = useState(null);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState("");

    const [showTopBtn, setShowTopBtn] = useState(false);

    const [followStatus, setFollowStatus] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            const token = parseJwt(authToken);
            setUserID(token.UserID);
        }
    }, [isLoggedIn, authToken]);

    useEffect(() => {
        if (currentUserID) {
            getData();
        }
    }, [currentUserID, page, condition]);

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 3000) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    };

    async function getUsers(userId) {
        if (!userId) return;

        // Check if user is already fetched
        if (users[userId]) return users[userId];

        const response = await UserService.getByID(userId);
        if (!response.error) {
            setUsers((prevUsers) => ({
                ...prevUsers,
                [userId]: response,
            }));

            return response;
        } else {
            setError(response.message);
        }
    }

    async function getPosts() {
        const response = await Service.homePagination(page, condition);

        if (response.error) {
            setError(response.message);
            return;
        }

        if (response.message.length < 30) {
            setHasMore(false);
        }

        const newPosts = response.message;
        const uniqueUserIds = [...new Set(newPosts.map((post) => post.userID))];

        // Fetch users for these posts if not already fetched
        await Promise.all(uniqueUserIds.map((id) => getUsers(id)));

        // Fetch follow statuses for all unique user IDs in a single request
        await getFollowStatusesForUsers(uniqueUserIds);

        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }

    async function getFollowStatusesForUsers(userIds) {
        if (!userIds.length || !currentUserID) return;

        try {
            const response = await FollowerService.getFollowingStatuses(currentUserID, userIds);

            if (!response.error) {
                if (userIds.length === 1) {
                    // If there's only one user, handle it directly without reduce
                    const singleUserId = userIds[0];
                    const status = response.message[singleUserId];
                    setFollowStatus((prev) => ({
                        ...prev,
                        [singleUserId]: status ? (status.isFollowing, status.followerId) : (false, null),
                    }));
                } else {
                    // Multiple users: use reduce to create followStatusMap
                    const followStatusMap = userIds.reduce((acc, id) => {
                        const status = response.message[id];
                        acc[id] = status ? (status.isFollowing, status.followerId) : (false, null);
                        return acc;
                    }, {});
                    setFollowStatus((prev) => ({
                        ...prev,
                        ...followStatusMap,
                    }));
                }
            } else {
                console.log("Error fetching follow statuses:", response.message);
            }
        } catch (error) {
            console.log("Failed to fetch follow statuses", error);
        }
    }

    function changeCondition(e) {
        setPage(1);
        setCondition(e.nativeEvent.srcElement.value);
        setPosts([]);
    }

    async function getData() {
        try {
            await getPosts();
            setIsLoading(false);
        } catch (error) {
            console.log("Error fetching data", error);
            setIsLoading(false);
        }
    }

    const handleFollowToggle = async (userId) => {
        if (followStatus[userId]) {
            // Unfollow logic
            const response = await FollowerService.remove(followStatus[userId]);

            if (response.message) {
                setFollowStatus((prev) => ({
                    ...prev,
                    [userId]: (false, null),
                }));
            } else {
                console.log("Error unfollowing user", response.message);
            }
        } else {
            // Follow logic
            const localDate = new Date();
            const offset = localDate.getTimezoneOffset();
            const formattedDate = new Date(localDate.getTime() - offset * 60 * 1000).toISOString().slice(0, -1);

            const response = await FollowerService.add({
                userID: currentUserID,
                followerUserID: userId,
                followedAt: formattedDate,
            });

            if (response.message) {
                setFollowStatus((prev) => ({
                    ...prev,
                    [userId]: [true, response.message.followerId],
                }));
                await getFollowStatusesForUsers([userId]);
            } else {
                console.log("Error following user", response.message);
            }
        }
    };

    function fetchMoreData() {
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [error]);

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

    const usernamesMap = useMemo(() => {
        if (!users || typeof users !== "object") {
            console.error("Users state is not in the expected format");
            return {};
        }

        return Object.keys(users).reduce((acc, userId) => {
            if (!userId) {
                console.error("Unexpected userId value:", userId);
                return acc;
            }

            const user = users[userId] || {};
            const username = user.message.username || "";
            const firstName = user.message.firstName || "";
            const lastName = user.message.lastName || "";
            const fullName = firstName || lastName ? `${firstName} ${lastName}`.trim() : "";

            acc[userId] = { username, fullName };
            return acc;
        }, {});
    }, [users]);

    const usernamesImageMap = useMemo(() => {
        return Object.keys(users).reduce((acc, userId) => {
            acc[userId] = users[userId]?.message.image;
            return acc;
        }, {});
    }, [users]);

    function image(userImage) {
        return userImage ? `${APP_URL}${userImage}?${Date.now()}` : defaultImage;
    }

    const handleEditorChange = (state, post) => {
        setNewComments((prevComments) => ({
            ...prevComments,
            [post]: state,
        }));
    };

    // Submit comment for a specific post
    const handleCommentSubmit = async (e, postId) => {
        e.preventDefault();

        const commentContent = draftToHtml(convertToRaw(newComments[postId].getCurrentContent()));
        if (!commentContent) return;

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
                setPosts((prevPosts) =>
                    prevPosts.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, { ...commentData, id: response.data }] } : post))
                );
            } else {
                setError("Failed to add comment.");
            }
            setNewComments({});
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
        setPosts((prevPosts) => prevPosts.map((post) => (post.comments ? { ...post, comments: post.comments.filter((comment) => comment.id !== id) } : post)));
    }

    function removeCommentId(id) {
        removeAsync(id);
    }

    const [expandedComments, setExpandedComments] = useState({});
    const [expandedModalComments, setExpandedModalComments] = useState({});

    const toggleExpand = (commentId) => {
        setExpandedComments((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const sanitizeHtmlWithClasses = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        tempDiv.querySelectorAll("ul").forEach((ul) => ul.classList.add("list-disc", "ml-4"));
        tempDiv.querySelectorAll("ol").forEach((ol) => ol.classList.add("list-decimal", "ml-4"));

        return tempDiv.innerHTML;
    };

    const handleNewComment = (postId, newComment) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    return { ...post, comments: [...post.comments, newComment] };
                }
                return post;
            })
        );
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

                    {!isLoading && (
                        <>
                            {/* Add Post Button */}
                            <div className="flex justify-center">
                                <Link
                                    to={RoutesNames.POST_NEW}
                                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                                >
                                    <MdOutlinePostAdd size={20} className="mr-3" />
                                    <span className="text-lg">Create New Post</span>
                                </Link>
                            </div>

                            {/* Search */}
                            <div className="flex flex-row justify-start gap-6 mb-2">
                                <div className="relative w-fit">
                                    <input
                                        type="text"
                                        name="search"
                                        placeholder="Search..."
                                        maxLength={32}
                                        onKeyUp={changeCondition}
                                        className="w-fit p-2 pl-10 bg-gray-800 text-white border border-gray-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                    <svg
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                            </div>
                        </>
                    )}

                    <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={
                            <div className="flex justify-center items-center pt-10">
                                <div className="inline-flex flex-col items-center space-y-3 py-4 px-8 bg-gray-900 rounded-lg shadow-2xl">
                                    <div className="w-6 h-6 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
                                    <div className="text-gray-200 font-mono text-xl tracking-wide animate-pulse">Loading more content...</div>
                                </div>
                            </div>
                        }
                        endMessage={
                            !condition && (
                                <div className="text-center text-gray-200 py-10">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-teal-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                        />
                                    </svg>
                                    <p className="mb-2 text-lg font-semibold text-gray-200">You've reached the end!</p>
                                    <p className="text-sm text-gray-400">That's all for now. Check back later for more updates or explore other sections.</p>
                                </div>
                            )
                        }
                    >
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            {!isLoading && error && (
                                <div className="col-span-full bg-red-500 py-4 px-6 rounded-xl text-center text-white font-bold mb-6">{error}</div>
                            )}

                            {posts
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((post, index) => {
                                    const processedPostContent = sanitizeHtmlWithClasses(post.content);

                                    return (
                                        <div
                                            key={index}
                                            className="bg-gray-800 shadow-xl rounded-2xl p-6 transition-all duration-300 transform hover:scale-102 hover:shadow-2xl text-white"
                                        >
                                            {/* Ensure the user is fetched if not already in state */}
                                            {!users[post.userID] && getUsers(post.userID)}

                                            {/* Post Header */}
                                            <div className="flex items-center mb-4">
                                                <div className="profile-avatar w-20 h-20 rounded-full overflow-hidden">
                                                    <img
                                                        src={image(usernamesImageMap[post.userID])}
                                                        alt="User Profile Picture"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="flex flex-col ml-4">
                                                    <div className="flex items-center space-x-1">
                                                        <span className="text-sm font-bold text-teal-400">{usernamesMap[post.userID]?.fullName}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-400">@{usernamesMap[post.userID]?.username || "Loading..."}</span>
                                                    <time className="text-[11px] text-gray-400">{getRelativeTime(post.createdAt)}</time>

                                                    <div className="flex items-center space-x-2">
                                                        {post.userID != currentUserID && (
                                                            <button
                                                                onClick={() => handleFollowToggle(post.userID)}
                                                                className={`px-3 py-1 text-xs mt-1 -ml-1 rounded-full font-semibold transition duration-300 ease-in-out ${
                                                                    followStatus[post.userID]
                                                                        ? "bg-red-500 hover:bg-red-600 text-gray-200"
                                                                        : "bg-teal-500 hover:bg-teal-600 text-gray-700"
                                                                }`}
                                                            >
                                                                {followStatus[post.userID] ? "Unfollow" : "Follow"}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Post Content */}
                                            <div className="text-gray-200 mb-4 text-lg">
                                                <div dangerouslySetInnerHTML={{ __html: processedPostContent }} />
                                            </div>

                                            {/* Comments Section */}
                                            {post.comments && post.comments.length > 0 && (
                                                <div className="mt-4">
                                                    <h3 className="text-sm font-semibold mb-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                                                        Comments
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {post.comments
                                                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                                            .slice(0, 3)
                                                            .map((comment, idx) => {
                                                                const isExpanded = expandedComments[comment.id] || false;
                                                                const isTruncated = comment.content.length > 1000;
                                                                const processedContent = sanitizeHtmlWithClasses(comment.content);

                                                                /* Ensure the user is fetched if not already in state */
                                                                !users[comment.userID] && getUsers(comment.userID);

                                                                return (
                                                                    <div
                                                                        key={idx}
                                                                        className="flex items-start bg-gray-700 p-4 rounded-lg"
                                                                        onClick={() => toggleExpand(comment.id)}
                                                                    >
                                                                        {/* Profile Avatar */}
                                                                        <div className="profile-avatar w-10 h-10 mb-4 rounded-full overflow-hidden">
                                                                            <img
                                                                                src={image(usernamesImageMap[comment.userID])}
                                                                                alt="User Profile Picture"
                                                                                className="object-cover w-full h-full"
                                                                            />
                                                                        </div>

                                                                        <div className="ml-3 flex-1">
                                                                            {/* User Information */}
                                                                            <div className="relative flex justify-between items-start">
                                                                                <div className="flex flex-col">
                                                                                    <span className="text-sm text-teal-400 font-semibold">
                                                                                        {usernamesMap[comment.userID]?.fullName}
                                                                                    </span>
                                                                                    <span className="text-xs text-gray-400">
                                                                                        @{usernamesMap[comment.userID]?.username || "Loading..."}
                                                                                    </span>
                                                                                    <time className="text-[11px] text-gray-400">
                                                                                        {getRelativeTime(comment.createdAt)}
                                                                                    </time>
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

                                                                            {/* Comment Content with expandable option */}
                                                                            <div className="text-sm text-gray-300 mt-2 leading-relaxed">
                                                                                {isExpanded ? (
                                                                                    <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                                                                                ) : (
                                                                                    <div>
                                                                                        <div
                                                                                            dangerouslySetInnerHTML={{
                                                                                                __html: processedContent.slice(0, 1000),
                                                                                            }}
                                                                                        />
                                                                                        {isTruncated && "..."}
                                                                                    </div>
                                                                                )}
                                                                            </div>

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

                                                    {post.comments.length > 3 && (
                                                        <button className="mt-4 w-fit text-white text-sm font-medium" onClick={() => openModal(post.id)}>
                                                            View all comments ({post.comments.length})
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            {/* Comment form to add a new comment for the specific post */}
                                            <PostComment postId={post.id} onNewComment={(newComment) => handleNewComment(post.id, newComment)} mode="comment" />
                                        </div>
                                    );
                                })}
                        </div>
                        {showTopBtn && (
                            <button
                                onClick={goToTop}
                                className="fixed right-10 bottom-10 bg-teal-500 text-white p-3 rounded-full shadow-lg z-10 transition-all ease-in-out duration-300 hover:bg-teal-600 focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                </svg>
                            </button>
                        )}
                    </InfiniteScroll>

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
                                        {(() => {
                                            const activePostData = posts.find((post) => post.id === activePost);
                                            if (activePostData) {
                                                const processedPostContent = sanitizeHtmlWithClasses(activePostData.content);
                                                return (
                                                    <div className="text-gray-200 mb-4 text-lg">
                                                        <div dangerouslySetInnerHTML={{ __html: processedPostContent }} />
                                                    </div>
                                                );
                                            } else {
                                                return <p>No post selected.</p>;
                                            }
                                        })()}
                                    </div>

                                    {/* Comments Section */}
                                    <div className="h-full mt-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-900">
                                        <h3 className="text-lg font-semibold text-center pb-2 border-b border-purple-500 mb-4">Comments</h3>
                                        <ul>
                                            {posts
                                                .find((post) => post.id === activePost)
                                                ?.comments.map((comment, idx) => {
                                                    const isExpanded = expandedModalComments[comment.id] || false;
                                                    const isTruncated = comment.content.length > 150;
                                                    const processedContent = sanitizeHtmlWithClasses(comment.content);

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
                                                                <div className="text-sm text-gray-300 mt-2 leading-relaxed">
                                                                    {isExpanded ? (
                                                                        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                                                                    ) : (
                                                                        <div>
                                                                            <div
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: processedContent.slice(0, 150),
                                                                                }}
                                                                            />
                                                                            {isTruncated && "..."}
                                                                        </div>
                                                                    )}
                                                                </div>

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
