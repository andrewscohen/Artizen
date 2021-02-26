import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signUp } from '../../services/auth';
import { setUser } from "../../store/session"

const SignUpModalForm = ({authenticated, setAuthenticated, setShowLoginForm}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, first_name, last_name, email, password);
      if (!user.errors) {
        dispatch(setUser(user));
        setAuthenticated(true);
        history.push("/dashboard")
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateFirstName= (e) => {
    setFirstName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form className="signup-modal-form" onSubmit={onSignUp}>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={updateFirstName}
          value={first_name}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={updateLastName}
          value={last_name}
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
      <p className="modal-bottom-text">Already signed up?</p>
      <p className="modal-bottom-text switch-text" onClick={() => setShowLoginForm(true)}>Login Here</p>
    </form>
  );
};

export default SignUpModalForm;
