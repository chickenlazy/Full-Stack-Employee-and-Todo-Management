import React from "react";
import { useState } from "react";
import { login, storeToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const user = {
    usernameOrEmail: username,
    password: password,
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    console.log(user);

    try {
      // Gọi hàm login từ AuthService và xử lý Promise
      login(user)
        .then((response) => {
          console.log(response);

          const token =
            "Basic" + window.btoa(user.usernameOrEmail + ":" + user.password);
          storeToken(token);
        })
        .catch((error) => {
          console.error(
            "Error during login process:",
            error.response.data.message
          );
        });

      // Đặt state về trạng thái khởi tạo sau khi đăng nhập
      setUsername("");
      setPassword("");

      navigate("/todos");
    } catch (error) {
      console.error("Error during login process:", error.response.data.message);
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login Form</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Username</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter User Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleLoginForm(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
