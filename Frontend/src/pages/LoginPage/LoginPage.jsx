import { Link } from "react-router-dom";
import "./login-page.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import jwt_decode from "jwt-decode";
import loginPagePic from "../../imgs/login-page-pic.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email || password === "") {
      alert("please fill the inputs");
      return;
    }
    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwt_decode(token);
      dispatch(authActions.login());
      dispatch(authActions.updateUserInfo(decodedToken));
      history.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row login-page-row">
        <div className="login-box d-flex align-items-center justify-content-center col-md-6">
          <form className="login-form " onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label d-flex align-items-center justify-content-center ">
                Email
              </label>
              <br />
              <span></span>
              <input
                type="text"
                placeholder="example@mail.com"
                className="form-control input-login"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="mb-3">
              <label className="form-label d-flex align-items-center justify-content-center">
                Password
              </label>
              <br />
              <span></span>
              <input
                type="password"
                className="form-control input-password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <p className=" d-flex align-items-center justify-content-center p-login-btn">
              <button type="submit" className="btn login-btn">
                Login
              </button>
            </p>
            <p className="d-flex align-items-center justify-content-center">
              <Link to="/register" className="link-to-register">
                Register now for free!
              </Link>
            </p>
            <br />
            <br />
          </form>
        </div>
        <div className="col-md-6">
          <img src={loginPagePic} alt="logo login " className="login-image" />
        </div>
      </div>
    </div>
  );
}
