import instance from "../../api/instance";

export const actionTypes = {
  SET_SONGS: "musicPlayer/SET_SONGS",
  SET_SONGS_DETAIL: "musicPlayer/SET_SONGS_DETAIL",
};

export const fecthSongsAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/all",
      method: "GET",
    });

    console.log(res);

    dispatch({
      type: actionTypes.SET_SONGS,
      payload: res.data.object,
    });

    return res.data.content;
  } catch (err) {}
};

export const fetchSongDetailAction = (songId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/get/",
        method: "GET",
        params: {
          id : songId
        }
      });
      console.log("detail");
      console.log(res);
      dispatch({
        type: actionTypes.SET_SONGS_DETAIL,
        payload: res.data.object,
      });
    } catch (err) {}
  };
};
