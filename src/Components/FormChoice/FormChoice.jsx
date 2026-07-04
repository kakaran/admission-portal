import React from "react";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import logo from "../../Assets/image.svg";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const recordFormChoice = (method) => {
  axios
    .post(`${BASE_URL}/api/formChoice`, { method })
    .catch((error) => console.log(error));
};

const FormChoice = ({ onFillEForm }) => {
  const handleDownload = () => recordFormChoice("Download");
  const handleFillEForm = () => {
    recordFormChoice("EForm");
    onFillEForm();
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-[#fdf3f0] to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="SGTBIMIT" width="96" height="96" />
          <h1 className="mt-2 text-[#9a031e] font-bold text-xl text-center">
            Management Quota Admission Form
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Choose how you'd like to proceed with your application
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <a
            href="/form.pdf"
            download="Admission Form"
            onClick={handleDownload}
            className="group flex flex-col items-start gap-3 bg-white border border-[#9a031e]/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#9a031e]/10 text-[#9a031e] group-hover:bg-[#9a031e] group-hover:text-white transition-colors">
              <IoMdDownload size={20} />
            </span>
            <h2 className="font-semibold text-gray-800">Download the Form</h2>
            <p className="text-sm text-gray-500">
              Get a printable PDF copy of the admission form to fill by hand
              and submit at the institute.
            </p>
            <span className="mt-auto text-sm font-medium text-[#9a031e] group-hover:underline">
              Download PDF
            </span>
          </a>

          <button
            type="button"
            onClick={handleFillEForm}
            className="group flex flex-col items-start gap-3 text-left bg-white border border-[#9a031e]/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#9a031e]/10 text-[#9a031e] group-hover:bg-[#9a031e] group-hover:text-white transition-colors">
              <HiOutlinePencilSquare size={20} />
            </span>
            <h2 className="font-semibold text-gray-800">Fill the E-Form</h2>
            <p className="text-sm text-gray-500">
              Complete and submit your admission application entirely online,
              including document uploads.
            </p>
            <span className="mt-auto text-sm font-medium text-[#9a031e] group-hover:underline">
              Fill Online
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormChoice;
