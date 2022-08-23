import React from "react";
import styles from "./style.module.css";
import { NavLink, useHistory } from "react-router-dom";

function Header() {

  const history = useHistory();
  console.log(history);

  const goToHome = () =>{
    history.push("/")
  }

  return (
    <div className={styles.header}>
      <span onClick={goToHome} className={styles.logo} href="#">
        Music Player
      </span>
      <nav className={styles.navbar}>
        <NavLink activeClassName={styles.active} to="/" exact>
          Home
        </NavLink>
        <NavLink activeClassName={styles.active} to="/signin">
          Sign in
        </NavLink>
        <NavLink activeClassName={styles.active} to="/signup">
          Sign up
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
