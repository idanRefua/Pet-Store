import "./register-page-style.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import registerLogo from "../../imgs/register.svg";

export default function RegisterPage() {
  const passValid = new RegExp(
    "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$"
  );
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Must be witn at least 2 characters")
        .required("Name is required"),
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
      setSuccessMsg("");

      try {
        if (!formik.errors.name && !formik.errors.name & !formik.errors.email) {
          const response = await axios.post("/users/adduser", values);
          setSuccessMsg(
            "You registerd successfuly , you will be move to login page!"
          );
          console.log(response.status);
          setTimeout(() => {
            history.push("login");
          }, 2000);
          console.log(values);
        }
      } catch (error) {
        setErrorMsg(
          "this is email is used , or there is problem with our servers,please try again later!"
        );
      }
    },
  });

  return (
    <div className="container">
      <div className="row register-row">
        <div className="register-form-box d-flex align-items-center justify-content-center col-md-6">
          <form className="register-form" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label d-flex align-items-center justify-content-center ">
                Name
              </label>
              <br />
              <span></span>
              <input
                type="text"
                className="form-control input-login"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="p-errors-register-inputs">{formik.errors.name}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label d-flex align-items-center justify-content-center ">
                Email
              </label>
              <br />
              <span></span>
              <input
                type="text"
                placeholder="example@mail.com"
                name="email"
                className="form-control input-login"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="p-errors-register-inputs">
                  {formik.errors.email}
                </p>
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
                <p className="p-errors-register-inputs">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <br></br>
            <p className="p-error-msg">{errorMsg}</p>
            <p>{successMsg}</p>
            <p className=" d-flex align-items-center justify-content-center p-login-btn">
              <button type="submit" className="btn register-btn">
                Register Now !
              </button>
            </p>
            <p className="d-flex align-items-center justify-content-center">
              <Link to="/login" className="link-to-login">
                You already register? Log-in Here
              </Link>
            </p>
          </form>
        </div>
        <div className="col-md-6">
          <img src={registerLogo} alt="image login" className="register-logo" />
        </div>
      </div>
    </div>
  );
}
