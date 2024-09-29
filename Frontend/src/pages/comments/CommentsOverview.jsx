import { useEffect, useState } from "react";
import Service from "../../services/CommentService";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line, RiUserFollowLine } from "react-icons/ri";
import PostService from "../../services/PostService";

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
                    <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-xl animate-bounce-slow text-white font-bold text-lg flex items-center space-x-3">
                        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Loading comments, please wait...</span>
                    </div>
                </div>
            )}
            {!isLoading && (
                <div className="overflow-x-auto">
                    <button
                        className="mb-5 flex items-center justify-center gap-2 rounded-md bg-green-600 hover:bg-green-700 transition duration-200 cursor-pointer w-fit px-6 py-2 text-center text-white font-semibold shadow-lg"
                        onClick={() => navigate(RoutesNames.COMMENT_NEW)}
                    >
                        <RiUserFollowLine />
                        ADD NEW COMMENT
                    </button>
                    {error && <div className="mb-5 bg-red-500 p-2 rounded-lg text-center text-white font-semibold">{error}</div>}
                    <table className="min-w-full table-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr className="text-center uppercase">
                                <th className="border border-gray-800 py-2">Username</th>
                                <th className="border border-gray-800 py-2">Post</th>
                                <th className="border border-gray-800 py-2">Comment</th>
                                <th className="border border-gray-800 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {Array.isArray(comments) && comments.length > 0 ? (
                                comments.map((i, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-800 py-2">{usernamesMap[i.userID] || "Loading..."}</td>
                                        <td className="border border-gray-800 py-2">{postsMap[i.postID] || "Loading..."}</td>
                                        <td className="border border-gray-800 py-2">{i.content || "Loading..."}</td>
                                        <td className="border border-gray-800 py-2">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg"
                                                    onClick={() => navigate(`/comments/${i.id}`)}
                                                >
                                                    <MdDriveFileRenameOutline />
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg" onClick={() => removeUser(i.id)}>
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border border-gray-800 py-2">
                                        No comments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
