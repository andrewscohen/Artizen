const LOAD_ALL_ARTWALKS = "artwalks/LOAD_ALL_ARTWALKS"
const LOAD_ONE_ARTWALK = "artwalks/LOAD_ONE_ARTWALK"

export const loadArtwalks = (artwalks) => {
  return { type: LOAD_ALL_ARTWALKS, artwalks };
};

export const loadOneArtwalk = (artwalk) => {
  return { type: LOAD_ONE_ARTWALK, artwalk };
}

export const getUserArtwalks = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/artwalks`);
  const data = await res.json();
  res.data = data;
  dispatch(loadArtwalks(res.data));
};

export const getOneArtwalk = (artwalkId) => async dispatch => {
  const res = await fetch(`/api/artwalks/${artwalkId}`);
  const data = await res.json();
  res.data = data;
  dispatch(loadOneArtwalk(res.data));
  return res;
}

const initialState = {currentArtwalk: {}};

export default function artwalksReducer(state = initialState, action) {
  const updateState = {...state};
  switch (action.type) {
    case LOAD_ALL_ARTWALKS:
      action.artwalks.forEach(artwalk => {
        updateState[artwalk.id] = artwalk;
      })
      return updateState;
      /* falls through */
    case LOAD_ONE_ARTWALK:
      updateState.currentArtwalk = action.artwalk;
      return updateState;
      /* falls through */
    default:
      return state;
  }
}
