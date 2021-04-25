import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "../../axios";
import "./Register.css";

function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [information, setInformation] = useState("");

  const user = {
    username,
    email,
    password,
    confirmPassword,
    information,
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("/user/register", user);
      if (resp.data.status === "error") {
        setErrors(resp.data.message);
      } else if (resp.data.status === "success") {
        history.push("/login");
        console.log(resp.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  };

  const redirectLogin = () => {
    history.push("/login");
  };

  return (
    <form className="register">
      <h3>REGISTER</h3>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Information"
        onChange={(e) => setInformation(e.target.value)}
      />

      {errors && <p className="errors">{errors}</p>}
      <button type="submit" onClick={register}>
        Register
      </button>

      <button type="button" onClick={redirectLogin}>
        Cancel
      </button>
    </form>
  );
}

export default Register;
