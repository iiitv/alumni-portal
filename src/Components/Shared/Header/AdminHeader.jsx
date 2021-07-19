import React from "react";
import { Divider } from "semantic-ui-react";
import "./Header.scss";
import { signOut } from "../../../services/firebase";

const AdminHeader = () => {
  const logo = "/asset/images/Home/HeaderNFooter/logo.png";
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
          <button className="button" onClick={signOut}>
            <img src="/asset/images/Home/HeaderNFooter/signout.png" alt="signout" className="signout-img"></img>
            <p className="button-text">Sign Out</p>
          </button>
      </div>
    </div>
  );
};

export default AdminHeader;
