import { NavLink } from "react-router-dom";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { useAuthValue } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../imgs/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  const [toogleMenu, setToogleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { user } = useAuthValue();

  const { logout } = useAuthenticator();

  const toogleNav = () => {
    setToogleMenu(!toogleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    return () => {
      window.addEventListener("resize", changeWidth);
    };
  }, []);
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          <img src={logo} alt={logo} className={styles.imgLogo} />
        </NavLink>
        {(toogleMenu || screenWidth > 500) && (
          <ul className={styles.list}>
            <li className={styles.items}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
            {!user && (
              <>
                <li className={styles.items}>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li className={styles.items}>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    Registre-se
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li className={styles.items}>
                  <NavLink
                    to="/post/postuser"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    Nova publicação
                  </NavLink>
                </li>
                <li className={styles.items}>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    Painel do usuario
                  </NavLink>
                </li>
              </>
            )}
            <li className={styles.items}>
              <NavLink
                to="/About"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Sobre
              </NavLink>
            </li>
            {user && (
              <li className={styles.items}>
                <button onClick={logout}>Sair</button>
              </li>
            )}
          </ul>
        )}

        <button onClick={toogleNav} className={styles.btn}>
          <AiOutlineMenu />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
