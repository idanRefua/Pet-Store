import { Link } from "react-router-dom";
import "./login-page.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      history.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-box d-flex align-items-center justify-content-center">
      <form className="login-form" onSubmit={handleLogin}>
        <br />
        <br />
        <div className="mb-3">
          <label
            htmlFor=""
            className="form-label d-flex align-items-center justify-content-center "
          >
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
          <label
            htmlFor=""
            className="form-label d-flex align-items-center justify-content-center"
          >
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
  );
}
