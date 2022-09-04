import produce from "immer";
import { actionTypes } from "./action";

const initialState = {
  songs: null,
  songDetail: null,
  updateSong: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SONGS: {
      // state.movies = action.payload;
      return produce(state, (draft) => {
        draft.songs = action.payload;
      });
    }

    case actionTypes.SET_SONGS_DETAIL: {
      // state.movies = action.payload;
      return produce(state, (draft) => {
        draft.songDetail = action.payload;
      });
    }

    case actionTypes.SET_UPDATE_SONG: {
      return produce(state, (draft) => {
        draft.updateSong = action.payload;
      });
    }

    default:
      return state;
  }
};

export default reducer;
