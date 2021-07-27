import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import Loader from "../Loader/Loader";
import AdminNavbar from "./AdminNavbar";
import Navbar from "./Navbar";

const NavDecider = (props) => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && !user && <Navbar>{props.children}</Navbar>}
      {!isLoading && user && <AdminNavbar>{props.children}</AdminNavbar>}
    </div>
  );
};

export default NavDecider;
