import instance from "../../api/instance";

export const actionTypes = {
  SET_SONGS: "musicPlayer/SET_SONGS",
  SET_SONGS_DETAIL: "musicPlayer/SET_SONGS_DETAIL",
};

export const fecthSongsAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/products",
      method: "GET",
    });

    console.log(res);

    dispatch({
      type: actionTypes.SET_SONGS,
      payload: res.data,
    });

    return res.data.content;
  } catch (err) {}
};

export const fetchSongDetailAction = (songId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/products/" + songId,
        method: "GET",
      });
      console.log("detail");
      console.log(res);
      dispatch({
        type: actionTypes.SET_SONGS_DETAIL,
        payload: res.data,
      });
    } catch (err) {}
  };
};
