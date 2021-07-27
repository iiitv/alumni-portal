import "./AdminLogin.scss";
import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  signInWithGoogle,
  isAdmin,
  signOut,
} from "../../services/authServices";
import { Message } from "semantic-ui-react";
import { UserContext } from "../../providers/UserProvider";
import Loader from "../Shared/Loader/Loader";

const AdminLogin = () => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const [notAdmin, setNotAdmin] = useState(false);
  useEffect(() => {
    if (user && !isLoading) {
      if (isAdmin(user.email)) {
        setredirect("/admin/dashboard");
      } else {
        signOut();
        setNotAdmin(true);
      }
    }
  }, [user, isLoading]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div className="adminLogin">
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="loginCard">
          <p>Admin Login</p>
          {notAdmin && (
            <Message
              warning
              onDismiss={() => setNotAdmin(false)}
              header="You Are Not A Admin!"
              content="Only Admin Can Login From Here."
            />
          )}
          <p className="line"></p>
          <p>Connect With</p>
          <p>
            <img
              className="google-img"
              src={"/asset/images/login/google.png"}
              onClick={signInWithGoogle}
              alt=""
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
