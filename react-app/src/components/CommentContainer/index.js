import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../store/comments";

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
      <p>This is a comment</p>
    </>
  );
};

export default CommentContainer;
