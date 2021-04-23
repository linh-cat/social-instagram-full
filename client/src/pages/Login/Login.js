import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "../../axios";
import "./Login.css";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");

  const user = {
    email: email,
    password: password,
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/user/login", user);
      console.log(resp.data);

      if (resp.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", resp.data.username);
        history.push("/");
        window.location.reload();
      } else {
        setError(resp.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="login">
      <h3>LOGIN</h3>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors && <p className="errors">{errors}</p>}
      <Link to="/register">You don't an account</Link>
      <button type="submit" onClick={login}>
        Login
      </button>
    </form>
  );
}

export default Login;
