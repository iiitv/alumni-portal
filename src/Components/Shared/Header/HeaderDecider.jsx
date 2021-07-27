import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import Loader from "../Loader/Loader";
import Header from "./Header";
import AdminHeader from "./AdminHeader";

const HeaderDecider = () => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && !user && <Header />}
      {!isLoading && user && <AdminHeader />}
    </div>
  );
};

export default HeaderDecider;
