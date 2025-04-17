import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'

const Signup = () => {
  
  const {handleSubmit, register, watch,formState: { errors }}= useForm();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("")
    console.log(watch("password"));
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/signup",
        data
      );
      navigate("/login");
      console.log(res, "res");
    } catch (error) {
      setError(error.message);
    } 
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl">Signup</h2>

      <form onSubmit={handleSubmit(create)} className="flex flex-col">
        <TextField
          id="fullname-helper-text-aligned"
          label="Name"
          type="text"   
          {...register("fullname",{
            required:true
          })}
        />
{errors.fullname && <span className="error">This field is required</span>}
        <TextField
          id="email-helper-text-aligned"
          label="Email"
          type="email"
          {...register("email",{
            required:true
          })}
        />
{errors.email && <span className="error">This field is required</span>}
        <TextField
          id="password-helper-text-aligned"
          label="Password"
          type="password"
          {...register("password",{
            required:true
          })}
        />
        {errors.password && <span className="error">This field is required</span>}
        <TextField
          id="confirmPassword-helper-text-aligned"
          label="Confirm Password"
          type="password"
          {...register("confirmPassword",{
            required:true
          })}
        />
{errors.confirmPassword && <span className="error">This field is required</span>}
        <Button variant="contained" type="submit" color="success">
          submit
        </Button>
      </form>

      <h2>OR</h2>

<Button variant="contained" type="button" color="success">
<Link to={'/login'}> 
Login
 </Link>
</Button> 

{error && <p className="error">{error} </p>}
    </div>
  );
};

export default Signup;
