import { useEffect, useState } from "react";
import Service from "../../services/CommentService";
import UserService from "../../services/UserService";
import { APP_URL, RoutesNames } from "../../constants";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import PostService from "../../services/PostService";
import { FaComments } from "react-icons/fa";
import getRelativeTime from "../../hooks/getRelativeTime";
import defaultImage from "../../assets/defaultImage.png";
import { Link } from "react-router-dom";

export default function CommentsOverview() {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState("");

    async function getComments() {
        const response = await Service.getPagination(page, condition);
        if (response.error) {
            setError(response.message);
            return;
        }
        if (response.message.length == 0) {
            setPage(page - 1);
            return;
        }
        setComments(response.message);
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
    }, [page, condition]);

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

    const postsMap = Array.isArray(posts)
        ? posts.reduce((i, post) => {
              i[post.id] = post.content;
              return i;
          }, {})
        : {};

    function image(userImage) {
        if (userImage != null) {
            return APP_URL + userImage + `?${Date.now()}`;
        }
        return defaultImage;
    }

    function changeCondition(e) {
        setPage(1);
        setCondition(e.nativeEvent.srcElement.value);
        setComments([]);
    }

    function increasePage() {
        setPage(page + 1);
    }

    function reducePage() {
        if (page == 1) {
            return;
        }
        setPage(page - 1);
    }

    const sanitizeHtmlWithClasses = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        tempDiv.querySelectorAll("ul").forEach((ul) => ul.classList.add("list-disc", "ml-4"));
        tempDiv.querySelectorAll("ol").forEach((ol) => ol.classList.add("list-decimal", "ml-4"));

        return tempDiv.innerHTML;
    };

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
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-100">Comments</h2>

                        {/* Search and Pagination */}
                        <div className="flex flex-row justify-between gap-4">
                            <div className="relative w-full sm:w-1/3">
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

                            {comments && comments.length > 0 && (
                                <div className="flex items-center justify-center space-x-3">
                                    <button onClick={reducePage} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                    </button>
                                    <span className="text-lg text-gray-300">{page}</span>
                                    <button onClick={increasePage} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && <div className="mb-5 bg-red-500 p-3 rounded-xl text-center text-white font-semibold animate-bounce">{error}</div>}

                    <div className="grid gap-6">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => {
                                const processedPostContent = sanitizeHtmlWithClasses(postsMap[comment.postID] || "Loading...");
                                const processedCommentsContent = sanitizeHtmlWithClasses(comment.content);

                                return (
                                    <div
                                        key={index}
                                        className="bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-transparent hover:border-blue-400 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="profile-avatar w-16 h-16 mb-4 rounded-full overflow-hidden">
                                                <img
                                                    src={image(usernamesImageMap[comment.userID])}
                                                    alt="User Profile Image"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-400">{getRelativeTime(comment.createdAt)}</div>
                                                <div className="flex-1 items-center">
                                                    <p className="text-lg font-medium text-gray-200">{usernamesMap[comment.userID] || "Loading..."}</p>
                                                    <p className="text-xs text-gray-500">
                                                        <div dangerouslySetInnerHTML={{ __html: processedPostContent }} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-gray-300 break-words">
                                            <div dangerouslySetInnerHTML={{ __html: processedCommentsContent }} />
                                        </p>
                                        <div className="flex justify-end space-x-2 mt-4">
                                            <Link className="btn-edit" to={`/comments/${comment.id}`}>
                                                <MdDriveFileRenameOutline size={20} />
                                            </Link>
                                            <button className="btn-delete" onClick={() => removeUser(comment.id)} title="Delete Comment">
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
