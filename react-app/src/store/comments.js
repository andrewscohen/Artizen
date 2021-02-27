const GET_LOCATION_COMMENTS = "comments/GET_LOCATION_COMMENTS";
const NEW_COMMENT = "comments/NEW_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";

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

const deleteOneCommentFromLocation = comment => {
  return {
    type: DELETE_COMMENT,
    payload: comment,
  };
};

const updateSpecificComment = comment => {
  return {
    type: UPDATE_COMMENT,
    payload: comment,
  };
};

export const getComments = locationId => async dispatch => {
  const res = await fetch(`/api/comments/${locationId}`);
  const data = await res.json();

  dispatch(getCommentsForLocation(data));
};

export const addComment = ({ locationId, userId, comment }) => async dispatch => {
  const res = await fetch(`/api/comments/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment,
      location_id: locationId,
      user_id: userId,
    }),
  });

  const data = await res.json();
  dispatch(addNewCommentToLocation(data));
};

export const deleteComment = id => async dispatch => {
  const res = await fetch(`/api/comments/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  dispatch(deleteOneCommentFromLocation(data));
};

export const updateComment = (id, comment) => async dispatch => {
  const res = await fetch(`/api/comments/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, comment }),
  });

  const data = await res.json();
  dispatch(updateSpecificComment(data));
};

const initialState = [];

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_COMMENTS:
      return action.payload;
    case NEW_COMMENT:
      return action.payload;
    case DELETE_COMMENT:
      return action.payload;
    case UPDATE_COMMENT:
      return action.payload;
    default:
      return state;
  }
};

export default commentsReducer;
