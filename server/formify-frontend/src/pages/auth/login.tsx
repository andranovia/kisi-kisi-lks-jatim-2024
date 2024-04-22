import { ChangeEvent, useState } from "react";
import "./login.css";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { handleLogin } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginValidation, setLoginValidation] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="login">
        <h1 className="login-title">Login</h1>
        <div className="login-card">
          <div className="login-input">
            <h4>Email</h4>
            <input
              type="text"
              placeholder="email"
              name="email"
              value={loginData.email}
              onChange={(e) => handleOnchange(e)}
            />
            {loginValidation.email ? (
              <>
                <h2 className="validation-error">{loginValidation.email}</h2>
              </>
            ) : null}
          </div>
          <div className="login-input">
            <h4>Password</h4>
            <input
              type="text"
              placeholder="password"
              name="password"
              value={loginData.password}
              onChange={(e) => handleOnchange(e)}
            />
            {loginValidation.password ? (
              <>
                <h2 className="validation-error">{loginValidation.password}</h2>
              </>
            ) : null}
          </div>
          <button
            onClick={() =>
              handleLogin({
                loginData: loginData,
                setLoginValidation: setLoginValidation,
              })
            }
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
