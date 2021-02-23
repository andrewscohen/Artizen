const LOAD_ALL_ARTWALKS = "artwalks/LOAD_ALL_ARTWALKS"


export const loadArtwalks = (artwalks) => {
  return { type: LOAD_ALL_Artwalks, artwalks };
};


// export const getArtwalks = () => async dispatch => {
//   const res = await fetch(`/api/artwalks/`);
//   dispatch(loadArtwalks(res.data.artwalks));
// };


const initialState = {};

export default function artwalksReducer(state = initialState, action) {
  const updateState = {...state};
  switch (action.type) {
    case LOAD_ALL_ARTWALKS: {
      updateState.artwalks = {};
      action.artwalks.forEach(artwalk => {
        updateState.artwalks[artwalk.id] = artwalk;
      })
      return updateState;
    }
    default:
      return state;
  }
}
