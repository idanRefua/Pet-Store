import { Link } from "react-router-dom";
import "./register-page-style.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post("/users/adduser", {
        email,
        password,
      });
      setSuccessMsg(
        "You registerd successfuly , you will be move to login page!"
      );
      setTimeout(() => {
        history.push("login");
      }, 2000);
    } catch (error) {
      setErrorMsg(
        "this is email is used , or there is problem with our servers,please try again later!"
      );
    }
  };

  return (
    <div className="register-form-box d-flex align-items-center justify-content-center">
      <form className="login-form" onSubmit={handleRegister}>
        <br />
        <br />
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
        <br></br>
        <p>{errorMsg}</p>
        <p>{successMsg}</p>
        <p className=" d-flex align-items-center justify-content-center p-login-btn">
          <button type="submit" className="btn login-btn">
            Register Now !
          </button>
        </p>

        <br />
        <br />
      </form>
    </div>
  );
}
