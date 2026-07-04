import React, { useContext, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AllContext } from "../../Context/Context";
import StudentDetail from "../../Components/StudentDetail/StudentDetail";
import MyForm from "../../Components/MyForm/MyForm";
import FormChoice from "../../Components/FormChoice/FormChoice";
import Loader from "../../Components/Loader/Loader";

const StudentDashbord = () => {
  const { formStatusCheck, formCheckLoading } = useContext(AllContext);
  const [fillingEForm, setFillingEForm] = useState(false);

  const renderContent = () => {
    if (formCheckLoading) return <Loader />;
    if (!formStatusCheck) return <StudentDetail />;
    if (fillingEForm)
      return <MyForm onBack={() => setFillingEForm(false)} />;
    return <FormChoice onFillEForm={() => setFillingEForm(true)} />;
  };

  return (
    <>
      <Navbar />
      {renderContent()}
    </>
  );
};

export default StudentDashbord;
