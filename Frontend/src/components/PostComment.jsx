import React, { useState, useEffect, useContext } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { BsFillSendFill } from "react-icons/bs";
import { AuthContext } from "./AuthContext";
import { parseJwt } from "../hooks/parseJwt";
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";
import { RoutesNames } from "../constants";
import { useNavigate } from "react-router-dom";
import useError from "../hooks/useError";

const PostComment = ({ postId, onNewComment, post, mode = "comment" }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { authToken } = useContext(AuthContext);
    const [currentUserID, setUserID] = useState(null);
    const { showError } = useError();

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            const token = parseJwt(authToken);
            setUserID(token.UserID);
        }
    }, [authToken]);

    const handleEditorChange = (state) => {
        setEditorState(state);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        // Function to strip HTML tags and get plain text content
        const stripHtmlTags = (html) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            return tempDiv.textContent || tempDiv.innerText || "";
        };

        // Get plain text from content
        const plainTextContent = stripHtmlTags(content).trim();

        // Check if content is empty
        if (plainTextContent.length < 1) {
            showError("Content is required and cannot be left blank.");
            return;
        }

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(localDate.getTime() - offset * 60 * 1000).toISOString().slice(0, -1);

        if (mode === "comment") {
            // Comment submission
            const commentData = {
                postID: postId,
                userID: currentUserID,
                content: content,
                createdAt: formattedDate,
            };
            try {
                const response = await CommentService.add(commentData);

                if (response.message && response.message.id) {
                    const newComment = {
                        ...post,
                        comments: [...post.comments, { ...commentData, id: response.message.id }],
                    };
                    setEditorState(EditorState.createEmpty());
                    onNewComment && onNewComment(newComment);
                }
            } catch (error) {
                console.error("Error posting comment", error);
            }
        } else if (mode === "post") {
            // Post submission
            const postData = {
                userID: currentUserID,
                content: content,
                createdAt: formattedDate,
            };
            try {
                const response = await PostService.add(postData);
                if (response.message) {
                    setEditorState(EditorState.createEmpty());
                    navigate(RoutesNames.HOME);
                }
            } catch (error) {
                console.error("Error posting post", error);
            }
        }
    };

    return (
        <div className="editor-component">
            <form onSubmit={handleSubmit} className="mt-4">
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                        options: ["inline", "list", "textAlign", "history"],
                        inline: { options: ["bold", "italic", "underline"] },
                    }}
                    placeholder={mode === "post" ? "Make a new post..." : "Write a comment..."}
                />
                <button type="submit" className="btn-main mt-2">
                    <BsFillSendFill />
                    {mode === "post" ? " Post" : " Comment"}
                </button>
            </form>
        </div>
    );
};

export default PostComment;
