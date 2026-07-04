import React from "react";
import { CircularProgress } from "@mui/material";
import logo from "../../Assets/image.svg";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#fdf3f0] to-white">
      <img src={logo} alt="SGTBIMIT" width="56" height="56" />
      <CircularProgress sx={{ color: "#9a031e" }} />
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  );
};

export default Loader;
