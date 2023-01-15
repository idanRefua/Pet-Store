import { useState } from "react";
import "./UserEditpopup.css";

const UserEditPopup = (props) => {
  /* NAME EMAIL Password id visible/show */

  const [name, setName] = useState(props.name); // Name from father
  const [email, setEmail] = useState(props.email); // email from father
  const [password, setPassword] = useState(props.password); // password from father

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdateUser(name, email, password, props.id);
  };

  return (
    <form className="popup-wrapper" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          value={name}
          onChange={handleChangeName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={handleChangePassword}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default UserEditPopup;
