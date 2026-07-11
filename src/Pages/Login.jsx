import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../Context/Context";
import LoginForm from "../Components/login-form";
import { IoMdDownload, IoMdArrowDropdown } from "react-icons/io";
import logo from "../Assets/image.svg";

const notices = [
  {
    label: "Admission Notice Under MQ 2026-27",
    href: "./Notice.pdf",
    download: "Admission Notice Under MQ 2026-27",
  },
  // {
  //   label: "Management Quota Guidelines 2025-26 - DPCI Act & Rules",
  //   href: "./ActRules.pdf",
  //   download: "Management Quota Guidelines 2025-26 - DPCI Act & Rules",
  // },
  // {
  //   label: "Management Quota Guidelines 2025-26 - DPCI Act",
  //   href: "./Act.pdf",
  //   download: "Management Quota Guidelines 2025-26 - DPCI Act",
  // },
];

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { setAuth, NotificationMethod } = useContext(AllContext);
  const navigate = useNavigate();
  const [noticesOpen, setNoticesOpen] = useState(false);
  const noticesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (noticesRef.current && !noticesRef.current.contains(e.target)) {
        setNoticesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        error.response.data.status,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf3f0] to-white">
      {/* Header: branding + notices dropdown together */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-[#9a031e]/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={logo}
              alt="SGTBIMIT"
              width="36"
              height="36"
              className="shrink-0"
            />
            <div className="leading-tight min-w-0">
              <p className="text-[#9a031e] font-semibold text-sm truncate">
                SGTBIMIT
              </p>
              <p className="text-gray-400 text-xs truncate">Admission Portal</p>
            </div>
          </div>

          <div className="relative shrink-0" ref={noticesRef}>
            <button
              type="button"
              onClick={() => setNoticesOpen((prev) => !prev)}
              className="flex items-center gap-1.5 bg-[#9a031e] text-white rounded-full pl-3 pr-2.5 py-1.5 text-sm font-medium shadow-sm shadow-[#9a031e]/20 hover:bg-[#7a0218] transition-colors"
            >
              <IoMdDownload size={14} />
              <span className="hidden sm:inline">Important Documents</span>
              <span className="sm:hidden">Documents</span>
              <IoMdArrowDropdown
                size={16}
                className={`transition-transform ${noticesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {noticesOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white border border-[#9a031e]/10 rounded-xl shadow-lg overflow-hidden z-20">
                {notices.map((notice) => (
                  <a
                    key={notice.download}
                    href={notice.href}
                    download={notice.download}
                    onClick={() => setNoticesOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#9a031e]/5 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#9a031e]/10 text-[#9a031e] shrink-0">
                      <IoMdDownload size={13} />
                    </span>
                    {notice.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Login */}
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10">
        <LoginForm onSubmit={UserLogin} />
      </main>
    </div>
  );
};

export default Login;
