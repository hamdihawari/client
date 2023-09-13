import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from './style.module.css'
import { Comment } from '../Comment/Comment'
import { CommentForm } from '../CommentForm/CommentForm'

export const Comments = ({ imageID, customStyle, currentUserId }) => {
  const [beackendComments, setBackendComments] = useState([])
  const getCommentstUrl = "http://localhost:9000/comment"
  const [activeComment, setActiveComment] = useState(null)

  const rootComments = beackendComments.filter(
    (beackendComment) => beackendComment.parentId === null && beackendComment.imageID === imageID
  )

  useEffect(() => {
    axios.get(getCommentstUrl)
      .then((res) => {
        setBackendComments(res.data)
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const getReplies = commentId => {
    return beackendComments.filter(beackendComment => beackendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }

  // Add Comment
  const createComment = (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      imageID: imageID,
      userId: "1",
      username: "John",
      createdAt: new Date().toISOString()
    }
  }
  const addComment = async (text, parentId) => {
    try {
      const newComment = createComment(text, parentId);
      const response = await axios.post(getCommentstUrl, newComment);
      setBackendComments([response.data, ...beackendComments]);
      setActiveComment(null)
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // DELETE
  const deleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      try {
        await axios.delete(`${getCommentstUrl}/${commentId}`);
        setBackendComments((prevComments) =>
          prevComments.filter((backendComment) => backendComment.id !== commentId)
        )
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  // DELETE
  const updateComment = (text, commentId) => {
    beackendComments(text).then(() => {
      const updatedBackendComments = beackendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };


  return (
    <div className={`${style.comments} ${customStyle?.comments}`}>
      <div className={style.commentsFormTitle}>Write Comment</div>
      <CommentForm submitLabel="Post" handleSubmit={addComment} imageID={imageID} />
      <div className={style.commentsContainer}>
        {
          rootComments.map((rootComments) => {
            return (
              <div key={rootComments.id}>
                <Comment key={rootComments.id}
                  comment={rootComments}
                  replies={getReplies(rootComments.id)}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  addComment={addComment}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  currentUserId={currentUserId}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}