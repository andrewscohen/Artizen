import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../store/comments";
import "./Comment.css";

const parseDate = str => `${str.slice(7, 11)} ${str.slice(4, 7)}, ${str.slice(11, 16)}`;

const Comment = ({ comment, setUpdateContainer }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteComment(id));
    setUpdateContainer(prev => !prev);
  };

  const handleEdit = (id, comment) => {
    dispatch(updateComment(id, comment));
    setUpdateContainer(prev => !prev);
    setShowEditForm(false);
  };

  return (
    <div className="comment-container">
      {showEditForm ? (
        <div className="comment-edit-form">
          <textarea value={editedComment} onChange={e => setEditedComment(e.target.value)}></textarea>
        </div>
      ) : (
        <p className="comment-content">{comment.comment}</p>
      )}
      <p className="comment-user-line">
        Posted by
        <span className="comment-user"> {comment.username}</span>
        <span className="comment-date">{parseDate(comment.created_at)}</span>
      </p>
      {sessionUser.id === comment.user_id && (
        <div className="comment-buttons">
          <button className='edit-btn' onClick={() => setShowEditForm(showEditForm => !showEditForm)}>
            <i className="far fa-edit"></i>
          </button>
          <button className='delete-btn' onClick={() => handleDelete(comment.id)}>
            <i className="far fa-trash-alt"></i>
          </button>
          {showEditForm &&
            <button className='save-btn' onClick={() => handleEdit(comment.id, editedComment)}>
              <i className="far fa-save"></i>
            </button>
          }
        </div>
      )}
    </div>
  );
};

export default Comment;
