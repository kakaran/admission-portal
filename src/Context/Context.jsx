import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AllProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
  });
  const [render, setRender] = useState(false);
  const [role, setRole] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [formStatusCheck, setFormStatucCheck] = useState(false);

  axios.defaults.headers.common["authtok"] = auth.token;

  const Authentication = async () => {
    try {
      const Response = (await axios.get(`${BASE_URL}/api/authentication`)).data;
      if (Response) {
        setRole(Response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function SignedInStatus() {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;

      if (token) if (!auth.token) setAuth({ token });

      setIsSignedIn(true);
    } catch (error) {
      console.log(error);
    }
  }

  const NotificationMethod = async (message, status) => {
    console.log(message, status);
    if (status) {
      toast.success(`${message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`${message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const formCheck = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/FormCheck`);
      if (data) {
        setFormStatucCheck(data.status);
      }
    } catch (error) {
      NotificationMethod(
        error.response.data.message,
        error.response.data.status
      );
    }
  };

  useEffect(() => {
    // setRender(!render);
    if (isSignedIn) {
      if (role === "Student") {
        formCheck();
      }
    }

    if (auth.token) {
      Authentication();
    }

    SignedInStatus();
  }, [render, auth.token, isSignedIn, role]);

  useEffect(() => {
    const local = localStorage.getItem("auth");

    if (local) {
      const auth = JSON.parse(local);
      console.log(auth);
      if (auth) {
        setAuth(auth);
      }
    }
  }, []);

  return (
    <AllContext.Provider
      value={{
        NotificationMethod,
        role,
        setAuth,
        isSignedIn,
        render,
        setRender,
        formStatusCheck,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

// const UseController = () => useContext(AllContext);

export { AllContext, AllProvider };
