const LOAD_ALL_ARTWALKS = "artwalks/LOAD_ALL_ARTWALKS";
const LOAD_ONE_ARTWALK = "artwalks/LOAD_ONE_ARTWALK";
const USER_LOGOUT = "USER_LOGOUT";
const DELETE_ARTWALK = "artwalks/DELETE_ARTWALK";

export const logout = () => {
  return { type: USER_LOGOUT };
};

export const loadArtwalks = artwalks => {
  return { type: LOAD_ALL_ARTWALKS, artwalks };
};

export const loadOneArtwalk = artwalk => {
  return { type: LOAD_ONE_ARTWALK, artwalk };
};

export const deleteArtwalk = artwalk => {
  return { type: DELETE_ARTWALK, artwalk };
};

export const getUserArtwalks = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/artwalks`);
  const data = await res.json();
  res.data = data;
  dispatch(loadArtwalks(res.data));
};

export const getOneArtwalk = artwalkId => async dispatch => {
  const res = await fetch(`/api/artwalks/${artwalkId}`);
  const data = await res.json();

  dispatch(loadOneArtwalk(data));
  return data;
};

export const deleteOneArtwalk = id => async dispatch => {
  const res = await fetch(`/api/artwalks/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  res.data = data;
  dispatch(loadArtwalks(res.data));
};

export const createArtWalk = artWalkObj => async dispatch => {
  const { artWalkList, user_id, artWalkName } = artWalkObj;
  const res = await fetch(`/api/artwalks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, name: artWalkName, artWalkList }),
  });
  let result = await res.json();
  return result;
};

const initialState = { currentArtwalk: {}, userArtwalks: {} };

export default function artwalksReducer(state = initialState, action) {
  const updateState = { ...state };
  switch (action.type) {
    case LOAD_ALL_ARTWALKS:
      action.artwalks.forEach(artwalk => {
        updateState.userArtwalks[artwalk.id] = artwalk;
      });
      return updateState;
    /* falls through */
    case LOAD_ONE_ARTWALK:
      updateState.currentArtwalk = action.artwalk;
      return updateState;
    /* falls through */

    case USER_LOGOUT:
      updateState.userArtwalks = {};
      return updateState;
    /* falls through */
    default:
      return state;
  }
}
