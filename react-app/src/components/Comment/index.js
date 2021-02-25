const Comment = ({ comment }) => {
  return (
    <>
      <p>{comment.user_id}</p>
      <p>{comment.comment}</p>
    </>
  );
};

export default Comment;
