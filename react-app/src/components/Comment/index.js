import "./Comment.css";

const parseDate = str => `${str.slice(7, 11)} ${str.slice(4, 7)}, ${str.slice(11, 16)}`;

const Comment = ({ comment }) => {
  return (
    <div className="comment-container">
      <p className="comment-content">{comment.comment}</p>
      <p className="comment-user-line">
        Posted by
        <span className="comment-user"> {comment.username}</span>
        <span className="comment-date">{parseDate(comment.created_at)}</span>
      </p>
    </div>
  );
};

export default Comment;
