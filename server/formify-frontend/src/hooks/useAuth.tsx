import { Dispatch, SetStateAction } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

type handleLoginProps = {
  loginData: {
    email: string;
    password: string;
  };
  setLoginValidation: Dispatch<
    SetStateAction<{ email: string; password: string }>
  >;
};

export default function useAuth() {
  const navigate = useNavigate();

  const handleLogin = async ({
    loginData,
    setLoginValidation,
  }: handleLoginProps) => {
    axiosInstance
      .post("v1/auth/login", {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        response.status === 200
          ? (localStorage.setItem("user", JSON.stringify(response.data.user)),
            navigate("/home"))
          : null;
      })
      .catch((error) => {
        setLoginValidation({
          email: error.response.data.errors.email,
          password: error.response.data.errors.password,
        });
        console.log(error);
      });
  };
  return { handleLogin };
}
