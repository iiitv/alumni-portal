import React from "react";
import { Divider } from "semantic-ui-react";
import {Link} from 'react-router-dom';
import "./Header.scss";
import { signOut } from "../../../services/firebase";

const AdminHeader = () => {
  const logo = "/asset/images/Home/HeaderNFooter/logo.png";
  const socialIcons = [
    "/asset/images/Home/HeaderNFooter/facebook.png",
    "/asset/images/Home/HeaderNFooter/twitter.png",
    "/asset/images/Home/HeaderNFooter/linkedin.png",
    "/asset/images/Home/HeaderNFooter/youtube.png",
    "/asset/images/Home/HeaderNFooter/instagram.png",
  ];
  return (
    <div className="header">
      <div className="left-flex">
        <div className="brand-logo">
          <a href="/">
            <img src={logo} alt={"logo"} className="brand-img" />
          </a>
        </div>
        <div className="brand">
          <div className="brand-name">Alumni Portal, IIIT Vadodara</div>
          <Divider fitted={true} className="brand-divider" />
          <div className="brand-name">Admin</div>
        </div>
      </div>

      <div className="right-flex">
        <Link to="/admin-login">
          <button className="button" onClick={signOut}>
            <img src="/asset/images/Home/HeaderNFooter/signout.png" alt="signout" className="signout-img"></img>
            <p className="button-text">Sign Out</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
