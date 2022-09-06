import React from "react";
import styles from "./style.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "features/authentication/action";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  console.log(history);
  const userProfile = useSelector((state) => state.auth.profile);
  console.log(userProfile);

  const goToHome = () => {
    history.push("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: SET_PROFILE,
      payload: null,
    });

    goToHome();
  };

  const renderUserInfo = () => {
    if (userProfile) {
      return (
        <>
          <a href="#">Hi, {userProfile[0]}{userProfile[1]}{userProfile[2]}{userProfile[3]}{userProfile[4]}</a>
          <a href="#" onClick={handleLogout}>
            Log out
          </a>

        </>
      );
    }

    return (
      <>
        <NavLink className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md  border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"  to="/Signin">
          Sign In
        </NavLink>

      </>
    );
  };

  return (
    <div  className={styles.header}>
      <span onClick={goToHome} className={styles.logo} href="#">
        Music Player
      </span>
      <nav className={styles.navbar}>
        <NavLink activeClassName={styles.active} to="/" exact>
          Home
        </NavLink>
        {renderUserInfo()}
      </nav>
    </div>
  );
}

export default Header;
