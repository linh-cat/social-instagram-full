import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import send from "../../assets/send.svg";
import profile from "../../assets/profile.svg";
import logo from "../../assets/logo.svg";
import explore from "../../assets/explore.svg";
import home from "../../assets/home.svg";
import exit from "../../assets/exit.svg";
import heart from "../../assets/heart.svg";
import plus from "../../assets/plus.svg";
import avatar from "../../assets/img/static.jpg";

function Header() {
  let history = useHistory();
  const user = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const logout = (e) => {
    localStorage.clear();
    window.location.reload();
  };
  const redirectHome = () => {
    history.push("/");
  };
  const redirectUser = (e, userId) => {
    history.push(`/user/${userId}`);
    console.log(userId);
  };

  const header = user ? (
    <header className="header">
      <div className="header__content">
        <Link to="/">
          <img src={logo} alt="instagram-logo" />
        </Link>
        <div className="header__content--input">
          <input type="text" placeholder="Search here ... " />
        </div>
        <div className="header__content--icon">
          <img src={home} alt="" onClick={redirectHome} />
          <img src={send} alt="" />
          <img src={explore} alt="" />
          <img src={heart} alt="" />
        </div>
        <div className="dropdown-user">
          <img src={avatar} alt="" className="avatar" />
          <div className="user-content">
            <div onClick={(e) => redirectUser(e, userId)}>
              <h4>Hi {user}</h4>
            </div>
            <div onClick={logout}>
              <img src={exit} alt="" />
              <p>Logout</p>
            </div>
            <div onClick={() => history.push("/new")}>
              <img src={plus} alt="" />
              <p>Post</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  ) : (
    <header className="header">
      <div className="header__content">
        <Link to="/">
          <img src={logo} alt="instagram-logo" />
        </Link>
        <div className="header__content--input">
          <input type="text" placeholder="Search here ... " />
        </div>
        <div className="header__content--icon">
          <img src={profile} alt="" />
        </div>
      </div>
    </header>
  );
  return header;
}

export default Header;
