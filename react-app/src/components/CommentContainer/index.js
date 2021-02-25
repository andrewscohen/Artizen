import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../store/comments";
import Comment from "../Comment";

const CommentContainer = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const comments = useSelector(state => state.comments);

  useEffect(() => {
    async function comment() {
      await dispatch(getComments(locationId));
    }
    comment();
  }, [dispatch, locationId]);

  return (
    <>
      <h1>Comments</h1>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentContainer;
