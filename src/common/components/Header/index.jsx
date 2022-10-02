import React from "react";
import styles from "./style.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "features/authentication/action";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  let user = {};

  const goToHome = () => {
    history.push("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("USER_LOGIN");
    localStorage.removeItem("token");

    dispatch({
      type: SET_PROFILE,
      payload: null,
    });

    history.push("/Signin")
  };

  const renderUserInfo = () => {
    if (localStorage.getItem("USER_LOGIN")) {
      user = JSON.parse(localStorage.getItem("USER_LOGIN"));
      return (
        <>
          <a href="#">
            Hi, {user[0]}
            {user[1]}
            {user[2]}
            {user[3]}
            {user[4]}
          </a>
          <a href="#" onClick={handleLogout}>
            Log out
          </a>
        </>
      );
    }

    return (
      <>
         <a
          className="mr-4 pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
          href=""
        >
          Sign in
        </a>

      </>
    );
  };

  return (
    <div className={styles.header}>
      <span onClick={goToHome} className={styles.logo} href="#">
        Music Player
      </span>
      <nav className={styles.navbar}>
        {renderUserInfo()}
      </nav>
    </div>
  );
}

export default Header;
