import { RiFileExcel2Fill } from "react-icons/ri";
import axios from "axios";
import xlsx from "json-as-xlsx"

const SubHeader = () => {
    const excelFileDownload = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/xlsxFormFile");
            if (data) {
                let filesData = [{
                    sheet: "Students",
                    columns: [
                        { label: "Email", value: "Email" },
                        { label: "CET Rank", value: "CETRank" },
                        { label: "CET Roll No", value: "CETRollNo" },
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
                        { label: "CET Roll No Copy", value: "CETRollNoCopy" },
                        { label: "Tenth Copy", value: "TenthCopy" },
                        { label: "Twelfth Copy", value: "TwelthCopy" },
                        { label: "Proof Of Address Copy", value: "ProofOfAddressCopy" },
                        { label: "Proof Of Reserved Copy", value: "ProofOfReservedCopy" },
                    ],
                    content: data.map((student) => ({
                        Email: student.Email,
                        CETRank: student.CETRank,
                        CETRollNo: student.CETRollNo,
                        IPUApplicationNo: student.IPUApplicationNo,
                        AdmitCardCopy: student.AdmitCardCopy,
                        NameStudent: student.NameStudent,
                        StudentContacatNo: student.StudentContacatNo,
                        StudentAdharCardNo: student.StudentAdharCardNo,
                        DOB: student.DOB,
                        FatherName: student.FatherName,
                        FatherOccupation: student.FatherOccupation,
                        FatherEmailId: student.FatherEmailId,
                        MotherName: student.MotherName,
                        MotherContactNo: student.MotherContactNo,
                        MotherOccupation: student.MotherOccupation,
                        MotherEmail: student.MotherEmail,
                        AdmissionCategory: student.AdmissionCategory,
                        AreaOfResidence: student.AreaOfResidence,
                        Gender: student.Gender,
                        PermanentAddress: student.PermanentAddress,
                        CorrespondenceAddress: student.CorrespondenceAddress,
                        Religion: student.Religion,
                        Nationality: student.Nationality,
                        TenthPercentage: student.TenthPercentage,
                        TwelthPercentage: student.TwelthPercentage,
                        StudentImage: student.StudentImage,
                        ProofOfDateOfBirthCopy: student.ProofOfDateOfBirthCopy,
                        CETRollNoCopy: student.CETRollNoCopy,
                        TenthCopy: student.TenthCopy,
                        TwelthCopy: student.TwelthCopy,
                        ProofOfAddressCopy: student.ProofOfAddressCopy,
                        ProofOfReservedCopy: student.ProofOfReservedCopy,
                    })),
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
        <div className=' mb-3 py-1 px-6 w-full flex justify-end border-y-2 border-y-slate-100'>
            <button
                onClick={() => excelFileDownload()}
                className='bg-[#52b788] py-2 px-4 rounded-md flex justify-start items-center gap-2 text-white'>
                <RiFileExcel2Fill />
                Excel</button>
        </div>
    )
}

export default SubHeader
