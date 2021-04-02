import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import { setUser } from "../../store/session"
import "./LoginModal.css"

const LoginModalForm = ({ authenticated, setAuthenticated, setShowLoginForm, showLoginForm,}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      dispatch(setUser(user))
      setAuthenticated(true);
      history.push("/dashboard");
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await login('demo@email.com', 'password');
    if (!demoUser.errors) {
      dispatch(setUser(demoUser))
      setAuthenticated(true);
      history.push("/dashboard");
    } else {
      setErrors(demoUser.errors);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form className="login-modal-form" onSubmit={onLogin}>
      {errors.length > 0 &&
        <div className="errors">
          {errors.map((error) => (
          <div>{error}</div>
          ))}
        </div>
      }
      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
          autoComplete="email"
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className="button-container">
        <div>
          <button id="btn" type="submit">Login</button>
        </div>
        <div>
          <button id="btn2" type="submit" onClick={demoLogin}>Demo User</button>
        </div>
      </div>

      <p className="modal-bottom-text">Don't have an account?</p>
      <p className="modal-bottom-text switch-text" onClick={() => setShowLoginForm(false)}>Sign Up Now</p>
    </form>
  );
};

export default LoginModalForm;
