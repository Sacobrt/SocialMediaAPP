import React, { useState, useEffect, useContext } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { BsFillSendFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { AuthContext } from "./AuthContext";
import { parseJwt } from "../hooks/parseJwt";
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";
import { RoutesNames } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import useError from "../hooks/useError";
import moment from "moment";
import { stateFromHTML } from "draft-js-import-html";

const PostComment = ({ postId, onNewComment, post, mode = "comment", editMode = false }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { authToken } = useContext(AuthContext);
    const [currentUserID, setUserID] = useState(null);
    const { showError } = useError();
    const [contentID, setContentID] = useState(null);
    const [originalUserID, setOriginalUserID] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const routeParams = useParams();

    useEffect(() => {
        if (authToken) {
            const token = parseJwt(authToken);
            setUserID(token.UserID);
        }
    }, [authToken]);

    useEffect(() => {
        if (editMode) {
            if (mode === "post") {
                loadPost();
            } else if (mode === "comment") {
                loadComment();
            }
        }
    }, [editMode]);

    const loadPost = async () => {
        try {
            const response = await PostService.getByID(id);

            if (response.message) {
                const postContent = response.message.content;
                setContentID(response.message.id);
                setOriginalUserID(response.message.userID);
                setCreatedAt(moment.utc(response.message.createdAt).format("yyyy-MM-DD"));

                // Parse HTML content into ContentState
                const contentState = stateFromHTML(postContent);
                setEditorState(EditorState.createWithContent(contentState));
            }
        } catch (error) {
            showError("Error loading post for editing.");
        }
    };

    const loadComment = async () => {
        try {
            const response = await CommentService.getByID(id);

            if (response.message) {
                const commentContent = response.message.content;
                setContentID(response.message.id);
                setOriginalUserID(response.message.userID);
                setCreatedAt(moment.utc(response.message.createdAt).format("yyyy-MM-DD"));

                // Parse HTML content into ContentState
                const contentState = stateFromHTML(commentContent);
                setEditorState(EditorState.createWithContent(contentState));
            }
        } catch (error) {
            showError("Error loading comment for editing.");
        }
    };

    const handleEditorChange = (state) => {
        setEditorState(state);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const stripHtmlTags = (html) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            return tempDiv.textContent || tempDiv.innerText || "";
        };

        const plainTextContent = stripHtmlTags(content).trim();

        if (plainTextContent.length < 1) {
            showError("Content is required and cannot be left blank.");
            return;
        }

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(localDate.getTime() - offset * 60 * 1000).toISOString().slice(0, -1);

        if (mode === "comment") {
            const commentData = {
                postID: postId,
                userID: editMode ? originalUserID : currentUserID,
                content: content,
                createdAt: formattedDate,
            };

            if (editMode) {
                await updateComment(commentData);
            } else {
                await createComment(commentData);
            }
        } else if (mode === "post") {
            const postData = {
                userID: editMode ? originalUserID : currentUserID,
                content: content,
                createdAt: formattedDate,
            };

            if (editMode) {
                await updatePost(postData);
            } else {
                await createPost(postData);
            }
        }
    };

    const updateComment = async (commentData) => {
        try {
            await CommentService.change(routeParams.id, commentData);
            setEditorState(EditorState.createEmpty());
            navigate(RoutesNames.COMMENT_OVERVIEW);
        } catch (error) {
            showError("Error updating comment.");
        }
    };

    const createComment = async (commentData) => {
        try {
            const response = await CommentService.add(commentData);
            if (response.message && response.message.id) {
                setEditorState(EditorState.createEmpty());
                onNewComment && onNewComment({ ...post, comments: [...post.comments, { ...commentData, id: response.message.id }] });
            }
        } catch (error) {
            showError("Error posting comment.");
        }
    };

    const updatePost = async (postData) => {
        try {
            await PostService.change(id, postData);
            setEditorState(EditorState.createEmpty());
            navigate(RoutesNames.POST_OVERVIEW);
        } catch (error) {
            showError("Error updating post.");
        }
    };

    const createPost = async (postData) => {
        try {
            const response = await PostService.add(postData);
            if (response.message) {
                setEditorState(EditorState.createEmpty());
                navigate(RoutesNames.HOME);
            }
        } catch (error) {
            showError("Error posting post.");
        }
    };

    const handleCancel = () => {
        if (mode === "post") {
            navigate(RoutesNames.POST_OVERVIEW);
        } else if (mode === "comment") {
            navigate(RoutesNames.COMMENT_OVERVIEW);
        }
    };

    return (
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
            <div className="flex justify-between mt-4">
                {(mode === "post" || (editMode && mode === "comment")) && (
                    <button type="button" className="btn-cancel flex items-center" onClick={handleCancel}>
                        <MdCancel className="mr-1" />
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn-main flex items-center">
                    <BsFillSendFill className="mr-1" />
                    {editMode ? (mode === "post" ? "Update Post" : "Update Comment") : mode === "post" ? "Post" : "Comment"}
                </button>
            </div>
        </form>
    );
};

export default PostComment;
