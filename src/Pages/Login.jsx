import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../Context/Context";
import LoginForm from "../Components/login-form";
import { IoMdDownload } from "react-icons/io";

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
    <>
      <div className="fixed flex justify-end items-center px-5 py-2 w-full">
         <div className="fixed flex flex-col justify-end items-center px-5 py-2 w-full">
        <a
          className="border rounded-full px-4 py-2 bg-[#3498db] text-white capitalize flex items-center gap-2"
          href="./form.pdf"
          download={"SGTB&IT_MQ_FORM_Common_Form"}
        >
          <IoMdDownload />
          Form Download
        </a>
            <a
          className="border rounded-full px-4 py-2 bg-[#3498db] text-white capitalize flex items-center gap-2"
          href="./Notice.pdf"
          download={"Admission Notice Under MQ 2025-26"}
        >
          <IoMdDownload />
          Admission Notice Under MQ 2025-26
        </a>
        </div>
      </div>
      
       
      <main className="min-h-screen flex items-center justify-center flex-col">
        <LoginForm onSubmit={UserLogin} />
      </main>
    </>
  );
};

export default Login;
