import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AllContext } from "../../Context/Context";
import StudentDetail from "../../Components/StudentDetail/StudentDetail";
import MyForm from "../../Components/MyForm/MyForm";

const StudentDashbord = () => {
  const { formStatusCheck } = useContext(AllContext);
  return (
    <>
      <Navbar />
      {formStatusCheck ? <MyForm /> : <StudentDetail />}
    </>
  );
};

export default StudentDashbord;
