import './AdminLogin.scss';
const AdminLogin = ()=>{
    return (
        <div className="adminLogin">
            <div className="loginCard">
                <p>Admin Login</p>
                <p className="line"></p>
                <p>Connect With</p>
                <p>
                    <img className="google-img" src={"/asset/images/login/google.png"} alt="" />
                </p>
            </div>
        </div>
    );
}

export default AdminLogin;