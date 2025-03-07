import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../services/PostService";
import PostComment from "../../components/PostComment";

export default function PostsChange() {
    const routeParams = useParams();
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);

    async function getPostData() {
        try {
            const response = await Service.getByID(routeParams.id);

            if (response.error) {
                setError(response.message);
                return;
            }
            setPost(response.message);
        } catch (error) {
            setError("Error fetching post data: " + error.message);
        }
    }

    useEffect(() => {
        getPostData();
    }, []);

    return (
        <div className="container mx-auto max-w-3xl mt-10 px-5 py-10 rounded-3xl shadow-2xl border-2 border-gray-600">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Edit Post</h1>
            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold">
                    <p>{error}</p>
                </div>
            )}

            {post && (
                <PostComment
                    post={post}
                    postId={routeParams.id}
                    mode="post"
                    editMode={true} // Indicates we're editing an existing post
                />
            )}
        </div>
    );
}
