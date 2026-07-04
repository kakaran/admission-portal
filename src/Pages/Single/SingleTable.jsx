import * as React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { IoMdArrowBack, IoMdDownload } from "react-icons/io";

const fetchData = (id) =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/StudentApplication/${id}`);

const METHOD_LABELS = {
  Download: "Downloaded PDF",
  EForm: "E-Form",
};

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 py-2">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-sm text-gray-800 font-medium break-words">
      {value || "—"}
    </span>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-6">
    <h2 className="text-[#9a031e] font-semibold text-base pb-3 mb-3 border-b border-[#9a031e]/10">
      {title}
    </h2>
    <div className="grid sm:grid-cols-2 gap-x-6">{children}</div>
  </div>
);

const DocumentCard = ({ label, src }) => (
  <a
    href={src}
    target="_blank"
    rel="noreferrer"
    download
    className="group flex flex-col gap-2 border border-gray-200 rounded-xl p-3 hover:border-[#9a031e] transition-colors"
  >
    <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
      {src ? (
        <img src={src} alt={label} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs text-gray-400">Not uploaded</span>
      )}
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-gray-700">{label}</span>
      {src && <IoMdDownload className="text-[#9a031e]" size={14} />}
    </div>
  </a>
);

export default function SingleTable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: student, isLoading, isError, error } = useQuery({
    queryKey: ["StudentApplication", id],
    queryFn: () => fetchData(id),
    select: (res) => res.data.student,
  });

  const data = student?.FormId;
  const name = data?.NameStudent || `${student?.FName || ""} ${student?.LName || ""}`.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf3f0] to-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pb-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-[#9a031e] hover:underline mb-4 mt-2"
        >
          <IoMdArrowBack size={16} />
          Back to applications
        </button>

        {isLoading && (
          <div className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-6">
            <Skeleton animation="wave" height={30} />
            <Skeleton animation="wave" height={30} />
            <Skeleton animation="wave" height={30} />
          </div>
        )}

        {isError && (
          <div className="bg-white border border-red-100 text-red-600 rounded-2xl shadow-sm p-6">
            {error.response?.data?.message || "Failed to load application."}
          </div>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-6 flex items-center gap-4">
              {data?.StudentImage && (
                <img
                  src={data.StudentImage}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#9a031e]/20"
                />
              )}
              <div>
                <h1 className="text-lg font-bold text-gray-800">{name || "—"}</h1>
                <p className="text-sm text-gray-500">
                  {data?.Email || student?.Email}
                </p>
                {data?.AdmissionCategory && (
                  <span className="inline-block mt-1 bg-[#9a031e]/10 text-[#9a031e] text-xs font-medium px-2.5 py-1 rounded-full">
                    {data.AdmissionCategory}
                  </span>
                )}
              </div>
            </div>

            {!data && (
              <div className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-6">
                <p className="text-gray-700 font-medium">
                  Application form not submitted yet
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {student?.SubmissionMethod
                    ? `Currently in progress via ${METHOD_LABELS[student.SubmissionMethod] || student.SubmissionMethod}.`
                    : "This student hasn't started their application form."}
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 mt-3">
                  <DetailRow label="Phone Number" value={student?.PhoneNo} />
                  <DetailRow
                    label="Signed Up On"
                    value={
                      student?.createdAt
                        ? new Date(student.createdAt).toLocaleString()
                        : null
                    }
                  />
                </div>
              </div>
            )}

            {data && (
              <>
                <SectionCard title="Student Details">
                  <DetailRow label="Date of Birth" value={data?.DOB} />
                  <DetailRow label="Gender" value={data?.Gender} />
                  <DetailRow
                    label="Contact Number"
                    value={data?.StudentContacatNo}
                  />
                  <DetailRow
                    label="Aadhaar Card No."
                    value={data?.StudentAdharCardNo}
                  />
                  <DetailRow label="Religion" value={data?.Religion} />
                  <DetailRow label="Nationality" value={data?.Nationality} />
                  <DetailRow
                    label="Area of Residence"
                    value={data?.AreaOfResidence}
                  />
                </SectionCard>

                <SectionCard title="Application Details">
                  <DetailRow label="CET Rank" value={data?.CETRank} />
                  <DetailRow label="CET Roll No." value={data?.CETRollNo} />
                  <DetailRow
                    label="IPU Application No."
                    value={data?.IPUApplicationNo}
                  />
                  <DetailRow
                    label="10th Percentage"
                    value={data?.TenthPercentage}
                  />
                  <DetailRow
                    label="12th Percentage"
                    value={data?.TwelthPercentage}
                  />
                </SectionCard>

                <SectionCard title="Address">
                  <DetailRow
                    label="Permanent Address"
                    value={data?.PermanentAddress}
                  />
                  <DetailRow
                    label="Correspondence Address"
                    value={data?.CorrespondenceAddress}
                  />
                </SectionCard>

                <SectionCard title="Parent / Guardian Details">
                  <DetailRow label="Father's Name" value={data?.FatherName} />
                  <DetailRow
                    label="Father's Occupation"
                    value={data?.FatherOccupation}
                  />
                  <DetailRow label="Father's Email" value={data?.FatherEmailId} />
                  <DetailRow label="Mother's Name" value={data?.MotherName} />
                  <DetailRow
                    label="Mother's Contact No."
                    value={data?.MotherContactNo}
                  />
                  <DetailRow
                    label="Mother's Occupation"
                    value={data?.MotherOccupation}
                  />
                  <DetailRow label="Mother's Email" value={data?.MotherEmail} />
                </SectionCard>

                <div className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-6">
                  <h2 className="text-[#9a031e] font-semibold text-base pb-3 mb-3 border-b border-[#9a031e]/10">
                    Document Uploads
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <DocumentCard label="Admit Card" src={data?.AdmitCardCopy} />
                    <DocumentCard
                      label="Student's Photo"
                      src={data?.StudentImage}
                    />
                    <DocumentCard
                      label="Proof of DOB"
                      src={data?.ProofOfDateOfBirthCopy}
                    />
                    <DocumentCard
                      label="CET Roll No. Copy"
                      src={data?.CETRollNoCopy}
                    />
                    <DocumentCard label="10th Marksheet" src={data?.TenthCopy} />
                    <DocumentCard label="12th Marksheet" src={data?.TwelthCopy} />
                    <DocumentCard
                      label="Proof of Address"
                      src={data?.ProofOfAddressCopy}
                    />
                    <DocumentCard
                      label="Proof of Reserved Category"
                      src={data?.ProofOfReservedCopy}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
