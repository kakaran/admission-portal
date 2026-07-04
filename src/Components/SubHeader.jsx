import { useState } from "react";
import { RiFileExcel2Fill } from "react-icons/ri";
import axios from "axios";
import xlsx from "json-as-xlsx"

const SubHeader = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const excelFileDownload = async () => {
        try {
            const params = {};
            if (fromDate) params.from = fromDate;
            if (toDate) params.to = toDate;

            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/xlsxFormFile`, { params });
            if (data) {
                let filesData = [{
                    sheet: "Students",
                    columns: [
                        { label: "Signup Name", value: "SignupName" },
                        { label: "Signup Email", value: "SignupEmail" },
                        { label: "Phone No", value: "PhoneNo" },
                        { label: "Joining Date", value: "JoiningDate" },
                        { label: "Submission Method", value: "SubmissionMethod" },
                        { label: "Download Time", value: "SubmissionMethodAt" },
                        { label: "Form Submitted At", value: "FormSubmittedAt" },
                        { label: "Email", value: "Email" },
                        { label: "CET/CUT Rank", value: "CETRank" },
                        { label: "CET/CUT Roll No", value: "CETRollNo" },
                        { label: "IPU Application No", value: "IPUApplicationNo" },
                        { label: "Admit Card Copy", value: "AdmitCardCopy" },
                        { label: "Name", value: "NameStudent" },
                        { label: "Contact No", value: "StudentContacatNo" },
                        { label: "Aadhar Card No", value: "StudentAdharCardNo" },
                        { label: "Date of Birth", value: "DOB" },
                        { label: "Father's Name", value: "FatherName" },
                        { label: "Father's Occupation", value: "FatherOccupation" },
                        { label: "Father's Email", value: "FatherEmailId" },
                        { label: "Mother's Name", value: "MotherName" },
                        { label: "Mother's Contact No", value: "MotherContactNo" },
                        { label: "Mother's Occupation", value: "MotherOccupation" },
                        { label: "Mother's Email", value: "MotherEmail" },
                        { label: "Admission Category", value: "AdmissionCategory" },
                        { label: "Area Of Residence", value: "AreaOfResidence" },
                        { label: "Gender", value: "Gender" },
                        { label: "Permanent Address", value: "PermanentAddress" },
                        { label: "Correspondence Address", value: "CorrespondenceAddress" },
                        { label: "Religion", value: "Religion" },
                        { label: "Nationality", value: "Nationality" },
                        { label: "Tenth Percentage", value: "TenthPercentage" },
                        { label: "Twelfth Percentage", value: "TwelthPercentage" },
                        { label: "Student Image", value: "StudentImage" },
                        {
                            label: "Proof Of Date Of Birth Copy",
                            value: "ProofOfDateOfBirthCopy",
                        },
                        { label: "CET/CUT Roll No Copy", value: "CETRollNoCopy" },
                        { label: "Tenth Copy", value: "TenthCopy" },
                        { label: "Twelfth Copy", value: "TwelthCopy" },
                        { label: "Proof Of Address Copy", value: "ProofOfAddressCopy" },
                        { label: "Proof Of Reserved Copy", value: "ProofOfReservedCopy" },
                    ],
                    content: data.map((student) => {
                        const form = student.FormId || {};
                        return {
                            SignupName: `${student.FName || ""} ${student.LName || ""}`.trim(),
                            SignupEmail: student.Email,
                            PhoneNo: student.PhoneNo,
                            JoiningDate: student.createdAt
                                ? new Date(student.createdAt).toLocaleDateString()
                                : "",
                            SubmissionMethod: student.SubmissionMethod || "Not chosen yet",
                            FormSubmittedAt: form.createdAt
                                ? new Date(form.createdAt).toLocaleString()
                                : "",
                            SubmissionMethodAt: student.SubmissionMethodAt
                                ? new Date(student.SubmissionMethodAt).toLocaleString()
                                : "",
                            Email: form.Email,
                            CETRank: form.CETRank,
                            CETRollNo: form.CETRollNo,
                            IPUApplicationNo: form.IPUApplicationNo,
                            AdmitCardCopy: form.AdmitCardCopy,
                            NameStudent: form.NameStudent,
                            StudentContacatNo: form.StudentContacatNo,
                            StudentAdharCardNo: form.StudentAdharCardNo,
                            DOB: form.DOB,
                            FatherName: form.FatherName,
                            FatherOccupation: form.FatherOccupation,
                            FatherEmailId: form.FatherEmailId,
                            MotherName: form.MotherName,
                            MotherContactNo: form.MotherContactNo,
                            MotherOccupation: form.MotherOccupation,
                            MotherEmail: form.MotherEmail,
                            AdmissionCategory: form.AdmissionCategory,
                            AreaOfResidence: form.AreaOfResidence,
                            Gender: form.Gender,
                            PermanentAddress: form.PermanentAddress,
                            CorrespondenceAddress: form.CorrespondenceAddress,
                            Religion: form.Religion,
                            Nationality: form.Nationality,
                            TenthPercentage: form.TenthPercentage,
                            TwelthPercentage: form.TwelthPercentage,
                            StudentImage: form.StudentImage,
                            ProofOfDateOfBirthCopy: form.ProofOfDateOfBirthCopy,
                            CETRollNoCopy: form.CETRollNoCopy,
                            TenthCopy: form.TenthCopy,
                            TwelthCopy: form.TwelthCopy,
                            ProofOfAddressCopy: form.ProofOfAddressCopy,
                            ProofOfReservedCopy: form.ProofOfReservedCopy,
                        };
                    }),
                }]

                let settings = {
                    fileName: "StudentList",
                }
                 xlsx(filesData, settings ,(sheet)=>{
                 })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='max-w-6xl mx-auto px-4 mt-5'>
            <div className='bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm py-3 px-5 flex flex-wrap justify-end items-center gap-3'>
                <div className='flex items-center gap-1.5 mr-auto'>
                    <RiFileExcel2Fill className='text-[#52b788]' size={18} />
                    <span className='text-sm text-gray-500'>Export applications to Excel</span>
                </div>
                <div className='flex items-center gap-1.5'>
                    <label htmlFor="excel-from-date" className='text-sm text-gray-500'>From</label>
                    <input
                        id="excel-from-date"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className='border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#9a031e]'
                    />
                </div>
                <div className='flex items-center gap-1.5'>
                    <label htmlFor="excel-to-date" className='text-sm text-gray-500'>To</label>
                    <input
                        id="excel-to-date"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className='border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#9a031e]'
                    />
                </div>
                <button
                    onClick={() => excelFileDownload()}
                    className='bg-[#52b788] hover:bg-[#469c76] transition-colors py-2 px-4 rounded-md flex justify-center items-center gap-2 text-white text-sm font-medium'>
                    <RiFileExcel2Fill />
                    Download Excel</button>
            </div>
        </div>
    )
}

export default SubHeader
