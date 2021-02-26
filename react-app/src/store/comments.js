const GET_LOCATION_COMMENTS = "comments/GET_LOCATION_COMMENTS";

const getCommentsForLocation = comments => {
  return {
    type: GET_LOCATION_COMMENTS,
    payload: comments,
  };
};

export const getComments = locationId => async dispatch => {
  const res = await fetch(`/api/comments/${locationId}`);
  const data = await res.json();

  dispatch(getCommentsForLocation(data));
};

const initialState = [];

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_COMMENTS:
      return action.payload;
    default:
      return state;
  }
};

export default commentsReducer;
