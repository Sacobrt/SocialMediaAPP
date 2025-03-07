import { useContext, useEffect, useRef, useState } from "react";
import Service from "../services/PostService";
import { IoIosClose } from "react-icons/io";
import getRelativeTime from "../hooks/getRelativeTime";
import defaultImage from "../assets/defaultImage.png";
import { APP_URL, RoutesNames } from "../constants";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComments, FaRegHeart, FaSignInAlt } from "react-icons/fa";
import { parseJwt } from "../hooks/parseJwt";
import { AuthContext } from "../components/AuthContext";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";

import InfiniteScroll from "react-infinite-scroll-component";
import FollowerService from "../services/FollowerService";
import { MdOutlinePostAdd } from "react-icons/md";
import NetworkGraph from "../components/NetworkGraph";
import { FcLike } from "react-icons/fc";
import TotalData from "../components/TotalData";

export default function Home() {
    const [posts, setPosts] = useState([]);
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

    function image(userImage) {
        if (userImage) {
            return `${APP_URL}${userImage}?${Date.now()}`;
        }
        return defaultImage;
    }

    const [expandedModalComments, setExpandedModalComments] = useState({});

    const toggleExpandModal = (commentId) => {
        setExpandedModalComments((prevState) => ({
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

    return (
        <div className="container mx-auto py-4 px-4">
            {isLoggedIn ? (
                <>
                    {isLoading && (
                        <div className="flex justify-center items-center">
                            <div className="inline-flex flex-col items-center space-y-3 py-4 px-8 bg-gray-900 rounded-lg shadow-2xl">
                                <div className="w-6 h-6 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
                                <div className="text-white font-mono text-xl tracking-wide animate-pulse">Loading content, please wait...</div>
                            </div>
                        </div>
                    )}

                    {!isLoading && (
                        <div className="flex justify-center items-center gap-5">
                            {/* Add Post Button */}
                            <div className="">
                                <Link
                                    to={RoutesNames.POST_NEW}
                                    className="flex mb-5 md:mb-0 items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-gray-200 font-medium rounded-md shadow-lg transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-0"
                                >
                                    <MdOutlinePostAdd size={20} className="mr-3" />
                                    <span className="text-lg">Create New Post</span>
                                </Link>
                            </div>

                            {/* Search */}
                            <div className="flex items-center">
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
                        </div>
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
                                    <p className="mb-2 text-lg font-semibold text-gray-200">You reached the end!</p>
                                    <p className="text-sm text-gray-400">That all for now. Check back later for more updates or explore other sections.</p>
                                </div>
                            )
                        }
                    >
                        <div className="grid gap-5 grid-cols-2 justify-center mt-5">
                            {!isLoading && error && <div className="col-span-full bg-red-500 py-4 px-6 text-center text-gray-200 font-bold mb-6">{error}</div>}

                            {posts
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((post, index) => {
                                    const processedPostContent = sanitizeHtmlWithClasses(post.content);

                                    return (
                                        <a
                                            href={`/${post.user.username.toLowerCase()}/status/${post.id}`}
                                            key={index}
                                            className="cursor-pointer hover:bg-opacity-20 transition-all bg-gray-800 shadow-md rounded-md p-5 duration-300 transform hover:shadow-xl text-gray-200"
                                        >
                                            {/* Post Header */}
                                            <div className="flex items-center mb-4">
                                                <div className="profile-avatar w-12 h-12 rounded-full overflow-hidden">
                                                    <img src={image(post.user.image)} alt="User Profile Picture" className="object-cover w-full h-full" />
                                                </div>
                                                <div className="flex flex-col ml-4">
                                                    <div className="flex items-center space-x-2">
                                                        {post.user.id != currentUserID && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                    handleFollowToggle(post.userID);
                                                                }}
                                                                className={`px-2 text-xs rounded-md font-semibold transition duration-300 ease-in-out ${
                                                                    followStatus[post.userID]
                                                                        ? "bg-red-500 hover:bg-red-600 text-gray-200"
                                                                        : "bg-teal-500 hover:bg-teal-600 text-gray-700"
                                                                }`}
                                                            >
                                                                {followStatus[post.userID] ? (
                                                                    <>
                                                                        <div className="flex items-center gap-1">
                                                                            <RiUserUnfollowLine />
                                                                            Unfolow
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="flex items-center gap-1">
                                                                            <RiUserFollowLine />
                                                                            Follow
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <span className="text-sm font-bold text-gray-200">{post.user.firstName + " " + post.user.lastName}</span>
                                                        <span className="text-xs text-gray-400">@{post.user.username || "Loading..."}</span>
                                                    </div>
                                                    <time className="text-[11px] text-gray-400">{getRelativeTime(post.createdAt)}</time>
                                                </div>
                                            </div>

                                            {/* Post Content */}
                                            <div className="text-gray-200 mb-4 text-lg">
                                                <div dangerouslySetInnerHTML={{ __html: processedPostContent }} />
                                            </div>

                                            <div className="flex items-center text-gray-200 space-x-5 font-bold">
                                                <span className="flex items-center gap-1.5">
                                                    <FaRegHeart />
                                                    {post.likes.toLocaleString()}
                                                </span>

                                                {post.comments && (
                                                    <button
                                                        className={`${post.comments.length > 0 ? "hover:text-cyan-400 transition duration-300 ease-out" : ""}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            post.comments.length > 0 && openModal(post.id);
                                                        }}
                                                    >
                                                        <span className="flex items-center gap-1.5">
                                                            <FaRegComments /> {post.comments.length}
                                                        </span>
                                                    </button>
                                                )}
                                            </div>
                                        </a>
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
                                            src={image(posts.find((post) => post.id === activePost)?.user.image)}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full overflow-hidden"
                                        />
                                        <div className="ml-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-lg font-bold text-teal-400">
                                                        {posts.find((post) => post.id === activePost)?.user.firstName +
                                                            " " +
                                                            posts.find((post) => post.id === activePost)?.user.lastName}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-400">
                                                    @{posts.find((post) => post.id === activePost)?.user.username || "Loading..."}
                                                </span>
                                                <time className="text-sm text-gray-400">
                                                    {getRelativeTime(posts.find((post) => post.id === activePost)?.createdAt)}
                                                </time>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Post Content */}
                                    <div className="text-lg scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-900">
                                        {(() => {
                                            const activePostData = posts.find((post) => post.id === activePost);
                                            if (activePostData) {
                                                const processedPostContent = sanitizeHtmlWithClasses(activePostData.content);
                                                return (
                                                    <>
                                                        <div className="text-gray-200 mb-4 text-lg">
                                                            <div dangerouslySetInnerHTML={{ __html: processedPostContent }} />
                                                        </div>
                                                        <p className="text-xs mt-2 text-gray-200 flex items-center gap-1">
                                                            <FcLike />
                                                            {posts.find((post) => post.id === activePost)?.likes} likes
                                                        </p>
                                                    </>
                                                );
                                            } else {
                                                return <p>No post selected.</p>;
                                            }
                                        })()}
                                    </div>

                                    {/* Comments Section */}
                                    <div className="h-full space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-900">
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
                                                                src={image(comment.user.image)}
                                                                alt="Commenter's Profile"
                                                                className="w-12 h-12 rounded-full shadow-sm overflow-hidden mr-2"
                                                            />
                                                            <div className="flex-1 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm mb-4">
                                                                <div className="grid items-center">
                                                                    <span className="text-md font-bold text-teal-400">
                                                                        {comment.user.firstName + " " + comment.user.lastName}
                                                                    </span>
                                                                    <span className="text-sm text-gray-400">@{comment.user.username || "Loading..."}</span>
                                                                    <time className="text-xs text-gray-400">{getRelativeTime(comment.createdAt)}</time>
                                                                </div>

                                                                {/* Comment content with expandable option */}
                                                                <div className="text-gray-200 mt-2 leading-relaxed">
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
                                                                <p className="text-xs mt-2 text-gray-200 flex items-center gap-1">
                                                                    <FcLike />
                                                                    {comment.likes} likes
                                                                </p>
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
                <>
                    <div className="mt-10 max-w-4xl mx-auto">
                        <div className="text-center bg-gray-900 bg-opacity-80 w-full py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out flex flex-col justify-center items-center space-y-8">
                            <div className="flex flex-col items-center">
                                <img
                                    alt="Social Media Logo"
                                    src="/logo.png"
                                    className={`-rotate-3 h-16 w-auto rounded-lg hover:rotate-3 transition-all duration-1000 ease-in-out hover:scale-125`}
                                />
                                <p className="text-sm text-gray-500">Connecting people, empowering voices, and shaping the future of social.</p>
                            </div>
                            <p className="text-md text-gray-200 max-w-lg px-6 lg:px-0">
                                Sign in to connect, share ideas, and engage with our vibrant community. Don’t have an account? Create one in just a few clicks!
                            </p>

                            <div className="w-fit">
                                <button
                                    onClick={() => navigate(RoutesNames.LOGIN)}
                                    className="w-full py-3 px-6 rounded-lg bg-blue-600 text-gray-200 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all duration-500 ease-in-out"
                                >
                                    <FaSignInAlt />
                                    Sign In with Email
                                </button>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <span>Don’t have an account?</span>
                                    <button onClick={() => navigate(RoutesNames.USER_NEW)} className="underline text-blue-400 hover:text-blue-500">
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </div>
                        <TotalData />
                        <NetworkGraph />
                    </div>
                </>
            )}
        </div>
    );
}
