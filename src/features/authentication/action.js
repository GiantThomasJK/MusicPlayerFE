import instance from "api/instance";
import axios from "axios";

export const SET_PROFILE = "auth/SET_PROFILE";

export const signInAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "http://localhost:8080/api/login",
        method: "POST",
        data: user,
      });

      const profile = { ...res.data.object[1] };
      localStorage.setItem("token", res.data.object[0]);
      localStorage.setItem("USER_LOGIN", JSON.stringify(profile));

      dispatch({
        type: SET_PROFILE,
        payload: profile,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
