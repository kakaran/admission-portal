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

export default function StudentDetail() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["AlreadySubmit"],
    queryFn: fetchData,
  });
  if (isLoading)
    return (
      <main className="grid place-content-center">
        <Skeleton animation="wave" width={700} height={30} />
        <Skeleton animation="wave" width={700} height={30} />
        <Skeleton animation="wave" width={700} height={30} />
      </main>
    );
  return (
    <>
      {isLoading && (
        <main className="grid place-content-center">
          <Skeleton animation="wave" width={700} height={30} />
          <Skeleton animation="wave" width={700} height={30} />
          <Skeleton animation="wave" width={700} height={30} />
        </main>
      )}
      {isError && (
        <main className="grid place-content-center">
          <div>{error.response?.data?.message}</div>
        </main>
      )}
      {!isError && !isLoading && (
        <main className="grid place-content-center">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.data?.DataGet.FormId?.NameStudent}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Email
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.data?.DataGet.FormId?.Email}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's DOB
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.data?.DataGet.FormId?.DOB}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Contact Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.data?.DataGet.FormId?.StudentContacatNo}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Category
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.data?.DataGet.FormId?.AdmissionCategory}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
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
      )}
    </>
  );
}
