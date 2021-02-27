import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../store/comments";
import "./Comment.css";

const parseDate = str => `${str.slice(7, 11)} ${str.slice(4, 7)}, ${str.slice(11, 16)}`;

const Comment = ({ comment }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDelete = (id, location_id) => {
    dispatch(deleteComment(id, location_id));
  };

  return (
    <div className="comment-container">
      <p className="comment-content">{comment.comment}</p>
      <p className="comment-user-line">
        Posted by
        <span className="comment-user"> {comment.username}</span>
        <span className="comment-date">{parseDate(comment.created_at)}</span>
      </p>
      {sessionUser.id === comment.user_id && (
        <>
          <button>
            <i class="far fa-edit"></i>
          </button>
          <button onClick={() => handleDelete(comment.id, comment.location_id)}>
            <i class="far fa-trash-alt"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default Comment;
