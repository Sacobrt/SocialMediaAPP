import { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../components/AuthContext";
import { parseJwt } from "../../hooks/parseJwt";
import PostComment from "../../components/PostComment";

export default function PostsAdd() {
    const [error, setError] = useState(null);
    const [userName, setUsername] = useState("");

    const { authToken } = useContext(AuthContext);

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            const token = parseJwt(authToken);
            setUsername(token.Username);
        }
    }, [isLoggedIn, authToken]);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [error]);

    return (
        <div className="container mx-auto max-w-3xl mt-10 px-5 py-12 rounded-3xl border-2 border-gray-600">
            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold animate-bounce">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <div className="space-y-4">
                <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ">
                    Make a Post
                </h1>

                <label htmlFor="userID" className="text-xl font-medium text-gray-200 mb-2 flex gap-1">
                    What is in your mind, <p className="text-teal-500 font-bold">@{userName.toLowerCase()}</p>
                </label>

                <div>
                    <PostComment mode="post" />
                </div>
            </div>
        </div>
    );
}
