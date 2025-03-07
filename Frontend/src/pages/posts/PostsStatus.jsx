import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Service from "../../services/PostService";
import defaultImage from "../../assets/defaultImage.png";
import getRelativeTime from "../../hooks/getRelativeTime";
import { APP_URL, RoutesNames } from "../../constants";
import PostComment from "../../components/PostComment";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../components/AuthContext";
import { parseJwt } from "../../hooks/parseJwt";
import { RiDeleteBin6Line } from "react-icons/ri";
import CommentService from "../../services/CommentService";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegComments, FaRegHeart } from "react-icons/fa";

export default function PostsStatus() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    const [expandedComments, setExpandedComments] = useState({});

    const { authToken } = useContext(AuthContext);
    const { isLoggedIn } = useAuth();
    const [currentUserID, setUserID] = useState(null);

    const toggleExpand = (commentId) => {
        setExpandedComments((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    useEffect(() => {
        if (isLoggedIn) {
            const token = parseJwt(authToken);
            setUserID(token.UserID);
        }
    }, [isLoggedIn, authToken]);

    useEffect(() => {
        async function getPostData() {
            try {
                const response = await Service.getByID(id);

                if (response.error) {
                    setError(response.message);
                    return;
                }
                setPost(response.message);
            } catch (err) {
                setError("Error fetching post data: " + err.message);
            }
        }

        getPostData();
    }, [id]);

    function image(userImage) {
        if (userImage) {
            return `${APP_URL}${userImage}?${Date.now()}`;
        }
        return defaultImage;
    }

    const sanitizeHtmlWithClasses = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        tempDiv.querySelectorAll("ul").forEach((ul) => ul.classList.add("list-disc", "ml-4"));
        tempDiv.querySelectorAll("ol").forEach((ol) => ol.classList.add("list-decimal", "ml-4"));

        return tempDiv.innerHTML;
    };

    if (error) {
        return (
            <div className="container mx-auto max-w-3xl mt-10 px-5 py-10 rounded-3xl shadow-2xl border-2 border-gray-600">
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="inline-flex flex-col items-center space-y-3 py-4 px-8 bg-gray-900 rounded-lg shadow-2xl">
                    <div className="w-6 h-6 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
                    <div className="text-white font-mono text-xl tracking-wide animate-pulse">Loading content, please wait...</div>
                </div>
            </div>
        );
    }

    const handleNewComment = async () => {
        try {
            const updatedPost = await Service.getByID(id);
            setPost(updatedPost.message);
        } catch (err) {
            setError("Error updating comments: " + err.message);
        }
    };

    async function removeAsync(id) {
        try {
            const response = await CommentService.remove(id);
            if (response.error) {
                setError(response.message);
                return;
            }

            const updatedPost = await Service.getByID(post.id);
            setPost(updatedPost.message);
        } catch (err) {
            setError("Error updating comments: " + err.message);
        }
    }

    function removeCommentId(id) {
        removeAsync(id);
    }

    async function removePostAsync() {
        try {
            const response = await Service.remove(post.id);

            if (response.error) {
                setError(response.message);
                return;
            }
            navigate(RoutesNames.HOME);
        } catch (err) {
            setError("Error updating post: " + err.message);
        }
    }

    function removePostId(id) {
        removePostAsync(id);
    }

    const processedPostContent = sanitizeHtmlWithClasses(post.content);

    return (
        <div className="container mx-auto max-w-3xl py-5 px-5">
            <div className="relative flex items-center gap-2">
                <button
                    onClick={() => navigate(RoutesNames.HOME)}
                    className="transition-colors duration-300 ease-linear hover:bg-gray-700 p-2 rounded-full text-gray-200"
                >
                    <IoMdArrowRoundBack size={24} />
                </button>
                <h1 className="text-2xl font-bold text-center text-gray-200">Post</h1>
            </div>
            <div className="grid mt-2 gap-2 text-gray-200">
                <div className="relative flex items-center">
                    <div className="profile-avatar w-12 h-12 rounded-full overflow-hidden">
                        <img src={image(post.user.image)} alt="User Profile Picture" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex flex-col ml-4">
                        <div className="flex items-center space-x-1">
                            <span className="font-bold text-gray-200">{post.user.firstName + " " + post.user.lastName}</span>
                            <span className="text-xs text-gray-400">@{post.user.username || "Loading..."}</span>
                        </div>
                        <time className="text-[11px] text-gray-400">{getRelativeTime(post.createdAt)}</time>
                    </div>

                    {/* Delete button for post by the logged-in user */}
                    {post.user.id == currentUserID && (
                        <button className="btn-delete absolute -right-3 -top-3" onClick={() => removePostId(post.id)} title="Delete Post">
                            <RiDeleteBin6Line size={16} />
                        </button>
                    )}
                </div>

                {/* Post Content */}
                <div className="text-gray-200 text-lg">
                    <div dangerouslySetInnerHTML={{ __html: processedPostContent }} />
                </div>

                <div className="flex items-center text-gray-200 space-x-5 font-bold">
                    <span className="flex items-center gap-1.5">
                        <FaRegHeart />
                        {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <FaRegComments /> {post.comments.length}
                    </span>
                </div>

                {/* Comments Section */}
                {post.comments && post.comments && (
                    <div className="bg-gray-900 bg-opacity-50 py-5 rounded-lg">
                        <div className="px-5">
                            <PostComment post={post} postId={post.id} onNewComment={handleNewComment} mode="comment" />
                        </div>

                        <div className="space-y-1">
                            {post.comments
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((comment, idx) => {
                                    const isExpanded = expandedComments[comment.id] || false;
                                    const isTruncated = comment.content.length > 1000;
                                    const processedContent = sanitizeHtmlWithClasses(comment.content);

                                    return (
                                        <div
                                            key={comment.id || idx}
                                            className="flex items-start border-gray-700 last:border-0 border-b p-4"
                                            onClick={() => toggleExpand(comment.id)}
                                        >
                                            {/* Profile Avatar */}
                                            <div className="profile-avatar w-10 h-10 mb-4 rounded-full overflow-hidden">
                                                <img
                                                    src={image(comment.user?.image)}
                                                    alt="User Profile Picture"
                                                    className="object-cover w-full h-full"
                                                    onError={(e) => (e.target.src = defaultImage)}
                                                />
                                            </div>

                                            <div className="ml-3 flex-1">
                                                {/* User Information */}
                                                <div className="relative flex justify-between items-start">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center space-x-1">
                                                            <span className="text-gray-200 font-semibold">
                                                                {comment.user.firstName + " " + comment.user.lastName}
                                                            </span>
                                                            <span className="text-sm text-gray-400">@{comment.user?.username || "Loading..."}</span>
                                                        </div>
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

                                                {/* Comment Content with expandable option */}
                                                <div className="text-sm text-gray-200 mt-2 leading-relaxed">
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

                                                <p className="mt-2 font-bold text-gray-200 flex items-center gap-1">
                                                    <FaRegHeart />
                                                    {comment.likes}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
