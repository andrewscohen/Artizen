import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import "./LoginModal.css"

const LoginModalForm = ({ authenticated, setAuthenticated, setShowLoginForm, showLoginForm}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form className="login-modal-form" onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div>
        <button id="btn" type="submit">Login</button>
      </div>
      <p>
        Don't have an account? 
      </p>
      <p onClick={() => setShowLoginForm(false)}>Sign Up Now</p>
    </form>
  );
};

export default LoginModalForm;
