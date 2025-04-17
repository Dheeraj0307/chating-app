import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        data
      );

      const storeToken = res.data.token;

      if (storeToken) {
        localStorage.setItem("token", storeToken);
      }
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="heading">Login</h2>

      <form onSubmit={handleSubmit(login)} className="flex flex-col">
        <TextField
          id="email-helper-text-aligned"
          label="Email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (val) =>
                /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(val) ||
                "Email must be validate",
            },
          })}
        />

        <TextField
          id="password-helper-text-aligned"
          label="Password"
          type="password"
          {...register("password", {
            required: true,
          })}
        />

        <Button variant="contained" type="submit" color="success">
          submit
        </Button>
      </form>

      <h2>OR</h2>

      <Button variant="contained" type="button" color="success">
        <Link to={"/signup"}>SignUp</Link>
      </Button>

      {error && <p className="error">{error} </p>}
    </div>
  );
};
export default Login;
