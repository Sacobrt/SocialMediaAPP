import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../services/CommentService";
import PostComment from "../../components/PostComment";

export default function CommentsChange() {
    const routeParams = useParams();
    const [comment, setComment] = useState({});
    const [error, setError] = useState(null);
    const [postID, setPostID] = useState(null);

    async function getCommentData() {
        try {
            const response = await Service.getByID(routeParams.id);

            setPostID(response.message.postID);

            if (response.error) {
                setError(response.message);
                return;
            }
            setComment(response.message);
        } catch (error) {
            setError("Error fetching comment data: " + error.message);
        }
    }

    useEffect(() => {
        getCommentData();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 rounded-3xl shadow-2xl border-2 border-gray-600">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">Edit Comment</h1>
            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-white font-semibold">
                    <p>{error}</p>
                </div>
            )}

            {comment && (
                <PostComment
                    post={comment} // In this case, "post" actually refers to the comment object
                    postId={postID}
                    mode="comment"
                    editMode={true} // Indicates we're editing an existing comment
                />
            )}
        </div>
    );
}
