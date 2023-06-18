import { Link } from "react-router-dom";
import "./login-page.css";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import jwt_decode from "jwt-decode";
import loginPagePic from "../../imgs/login-page-pic.svg";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  const passValid = new RegExp(
    "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(5, "Password is too short (min - 5 characters)")
        .matches(
          passValid,
          "Password must include at least : One Uppercase letter [A-Z], One number [0-9] and one symbol [!,@,#,%,$,&,^]"
        ),
    }),
    onSubmit: async (values) => {
      setErrorMsg("");
      try {
        const response = await axios.post("/users/login", values);
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decodedToken = jwt_decode(token);
        dispatch(authActions.login());
        dispatch(authActions.updateUserInfo(decodedToken));
        if (
          location.state === undefined ||
          location.state === null ||
          location.state === "/"
        ) {
          history.push("/");
        } else {
          history.push(location.state.prevUrl);
        }
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    },
  });

  return (
    <div className="container">
      <div className="row login-page-row">
        <div className="login-box d-flex align-items-center justify-content-center col-md-6">
          <form className="login-form " onSubmit={formik.handleSubmit}>
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
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="p-err-msg-login">{formik.errors.email}</p>
              ) : null}
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
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="p-err-msg-login"> {formik.errors.password}</p>
              ) : null}
            </div>
            {errorMsg !== "" && <p className="p-err-msg-login">{errorMsg}</p>}
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
