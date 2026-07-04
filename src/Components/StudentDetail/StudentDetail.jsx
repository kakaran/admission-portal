import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const fetchData = () => axios.get(`${BASE_URL}/api/StudentformDisplay`);

const DETAIL_ROWS = [
  { label: "Student's Name", key: "NameStudent" },
  { label: "Student's Email", key: "Email" },
  { label: "Student's DOB", key: "DOB" },
  { label: "Student's Contact Number", key: "StudentContacatNo" },
  { label: "Student's Category", key: "AdmissionCategory" },
];

export default function StudentDetail() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["AlreadySubmit"],
    queryFn: fetchData,
  });

  const form = data?.data?.DataGet.FormId;

  if (isLoading)
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
        <Skeleton animation="wave" height={30} />
      </main>
    );

  if (isError)
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div>{error.response?.data?.message}</div>
      </main>
    );

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="md:hidden bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm divide-y divide-gray-100">
        {DETAIL_ROWS.map(({ label, key }) => (
          <div key={key} className="flex flex-col gap-0.5 px-4 py-3">
            <span className="text-xs text-gray-400">{label}</span>
            <span className="text-sm text-gray-800 font-medium break-words">
              {form?.[key] || "—"}
            </span>
          </div>
        ))}
        <div className="px-4 py-3">
          <span className="text-xs text-gray-400 block mb-1">Form Status</span>
          <div className="bg-green-400 rounded-md text-white py-2 text-center font-bold">
            Submitted
          </div>
        </div>
      </div>

      <TableContainer component={Paper} className="hidden md:block">
        <Table aria-label="student details table">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DETAIL_ROWS.map(({ label, key }) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {label}
                </TableCell>
                <TableCell component="th" scope="row">
                  {form?.[key]}
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                Form Status
              </TableCell>
              <TableCell component="th" scope="row">
                <div className="bg-green-400 rounded-md text-white p-2 text-center font-bold">
                  Submitted
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
