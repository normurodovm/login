import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { request } from "../config/request";
import { saveState } from "../config/storage";

export const UserLogin = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const submit = (data) => {
    request
      .post("/login", data)
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
    <div className="container">
          <div className="signin-form">
      <h1>login</h1>
      <div>
        <form onSubmit={handleSubmit(submit)}>
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
  );
};
