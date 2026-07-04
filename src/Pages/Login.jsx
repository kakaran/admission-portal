import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../Context/Context";
import LoginForm from "../Components/login-form";
import { IoMdDownload } from "react-icons/io";
import logo from "../Assets/image.svg";

const notices = [
  {
    label: "Admission Notice Under MQ 2025-26",
    href: "./Notice.pdf",
    download: "Admission Notice Under MQ 2025-26",
  },
  {
    label: "Management Quota Guidelines 2025-26 - DPCI Act & Rules",
    href: "./ActRules.pdf",
    download: "Management Quota Guidelines 2025-26 - DPCI Act & Rules",
  },
  {
    label: "Management Quota Guidelines 2025-26 - DPCI Act",
    href: "./Act.pdf",
    download: "Management Quota Guidelines 2025-26 - DPCI Act",
  },
];

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
    <div className="min-h-screen bg-gradient-to-b from-[#fdf3f0] to-white">
      {/* Notices - horizontal scrollable strip */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-[#9a031e]/10 relative">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-3 max-w-6xl mx-auto scroll-smooth snap-x">
          {notices.map((notice) => (
            <a
              key={notice.download}
              className="group shrink-0 snap-start whitespace-nowrap flex items-center gap-2 bg-[#9a031e] text-white rounded-full pl-2.5 pr-4 py-1.5 text-sm font-medium shadow-sm shadow-[#9a031e]/20 hover:bg-[#7a0218] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              href={notice.href}
              download={notice.download}
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 group-hover:bg-white/25 shrink-0">
                <IoMdDownload className="shrink-0" size={13} />
              </span>
              {notice.label}
            </a>
          ))}
        </div>
        {/* fade hint that the strip scrolls when items overflow */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white/90 to-transparent" />
      </div>

      {/* Login */}
      <main className="min-h-[calc(100vh-56px)] flex items-center justify-center flex-col px-4 py-10">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="SGTBIMIT" width="64" height="64" />
          <p className="mt-2 text-[#9a031e] font-semibold tracking-wide text-lg">
            SGTBIMIT
          </p>
          <p className="text-gray-500 text-sm">Admission Portal</p>
        </div>
        <LoginForm onSubmit={UserLogin} />
      </main>
    </div>
  );
};

export default Login;
