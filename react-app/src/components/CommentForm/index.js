import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/comments";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const { locationId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addComment({ locationId, userId: sessionUser.id, comment }));
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <textarea value={comment} onChange={e => setComment(e.target.value)} required></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
