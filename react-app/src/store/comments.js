const GET_LOCATION_COMMENTS = "comments/GET_LOCATION_COMMENTS";
const NEW_COMMENT = "comments/NEW_COMMENT";

const getCommentsForLocation = comments => {
  return {
    type: GET_LOCATION_COMMENTS,
    payload: comments,
  };
};

const addNewCommentToLocation = comments => {
  return {
    type: NEW_COMMENT,
    payload: comments,
  };
};

export const getComments = locationId => async dispatch => {
  const res = await fetch(`/api/comments/${locationId}`);
  const data = await res.json();

  dispatch(getCommentsForLocation(data));
};

export const addComment = (comment, locationId, userId) => async dispatch => {
  const res = await fetch(`/api/comments/new/${locationId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment,
      locationId,
      userId,
    }),
  });

  const data = await res.json();
  dispatch(addNewCommentToLocation(data));
};

const initialState = [];

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_COMMENTS:
      return action.payload;
    case NEW_COMMENT:
      return action.payload;
    default:
      return state;
  }
};

export default commentsReducer;
