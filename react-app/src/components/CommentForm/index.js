import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/comments";
import "./CommentForm.css";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const { locationId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addComment({ locationId, userId: sessionUser.id, comment }));
    setComment("");
  };

  return (
    <div className="comment-form-container">
      <form className="comment-form" onSubmit={e => handleSubmit(e)}>
        <textarea
          placeholder="What do you think?"
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="btn-main">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
