import React from "react";
import { useForm } from "react-hook-form";
import { request } from "../config/request";
import { saveState } from "../config/storage";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../components/user-login";
import './login.css'
export const Login = () => {
  const navigate = useNavigate();
  const [open, setOPen] = React.useState(false);
  const { handleSubmit, register, reset } = useForm();

  const registerUser = (data) => {
    request
      .post("/register", data)
      .then((res) => {
        if (res.data) {
          saveState("user", {
            accessToken: res.data.accessToken,
            ...res.data.user,
          });
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {open ? (
        <>
          <UserLogin />
        </>
      ) : (
        <><div className="container">
          <div className="signin-form">
          <h1>Register</h1>
          <div>
            <form onSubmit={handleSubmit(registerUser)}>

              <div className="form-group">
              <label for="email">Name:</label>
              <input {...register("name")} placeholder="name" type="text" />
              </div>

              <div className="form-group">
              <label for="email">Email:</label>
              <input {...register("email")} placeholder="email" type="email" />
              </div>

              <div className="form-group">
              <label for="password">Password:</label>
              <input
                {...register("password")}
                placeholder="password"
                type="password"
              />
              </div>
              <button type="submit">send</button>
            </form>
          </div>
          </div>
          </div>
        </>
      )}
      <button onClick={() => setOPen(!open)}>
        {open ? "Register" : "LOgin"}
      </button>
    </>
  );
};
