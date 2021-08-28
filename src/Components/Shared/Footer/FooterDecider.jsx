import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import Loader from "../Loader/Loader";
import AdminFooter from "./AdminFooter";
import Footer from "./Footer";

const FooterDecider = (props) => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && !user && <Footer />}
      {!isLoading && user && <AdminFooter />}
    </div>
  );
};

export default FooterDecider;
