import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../Context/Context";
import LoginForm from "../Components/login-form";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { setAuth, NotificationMethod } = useContext(AllContext);
  const navigate = useNavigate();

  const UserLogin = async (values) => {
    try {
      const { Email, Password } = values;
      const Data = (
        await axios.post(`${BASE_URL}/api/login`, { Email, Password })
      ).data;
      if (Data.token) {
        localStorage.setItem("auth", JSON.stringify(Data));
        // Authentication(Data.token)
        setAuth({
          token: Data.token,
        });
        navigate("/Dashbord");
      }
      NotificationMethod(Data.message, Data.status);
    } catch (error) {
      NotificationMethod(
        error.response.data.message,
        error.response.data.status
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <LoginForm onSubmit={UserLogin} />
    </main>
  );
};

export default Login;
