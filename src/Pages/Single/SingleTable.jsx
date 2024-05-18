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
import { Link, useParams } from "react-router-dom";
import Navbar from "../..//Components/Navbar/Navbar";

const fetchData = () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/FormDispaly`);

export default function SingleTable() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["AdminTable", id],
    queryFn: fetchData,
    select: (data) => {
      return data.data.FormData.find((item) => item._id === id);
    },
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
      <Navbar />
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
                    {data?.NameStudent}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Email
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.Email}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's DOB
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.DOB}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Contact Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.StudentContacatNo}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Category
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.AdmissionCategory}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's CET Rank
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.CETRank}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's CET Roll Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.CETRollNo}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    IPU Application Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.IPUApplicationNo}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Aadhaar Card Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.StudentAdharCardNo}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Father's Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.FatherName}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Father's Occupation
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.FatherOccupation}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Father's Email
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.FatherEmailId}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Mother's Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.MotherName}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Mother's Contact Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.MotherContactNo}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Mother's Occupation
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.MotherOccupation}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Mother's Email
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.MotherEmail}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Area of Residence
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.AreaOfResidence}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Gender
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.Gender}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Permanent Address
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.PermanentAddress}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Correspondence Address
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.CorrespondenceAddress}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Religion
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.Religion}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Nationality
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.Nationality}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    10<sup>th</sup> Percentage
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.TenthPercentage}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    12<sup>th</sup> Percentage
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data?.TwelthPercentage}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Admit Card
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={data?.AdmitCardCopy}
                      alt="Admit Card"
                      className="w-1/2"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Student's Image
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={data?.StudentImage}
                      alt="Admit Card"
                      className="w-1/2"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Proof of DOB
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={data?.ProofOfDateOfBirthCopy}
                      alt="Admit Card"
                      className="w-1/2"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    CET Roll Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={data?.CETRollNoCopy}
                      alt="Admit Card"
                      className="w-1/2"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    10<sup>th</sup> Marksheet
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={data?.TenthCopy}
                      alt="Admit Card"
                      className="w-1/2"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    12<sup>th</sup> Marksheet
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={data?.TwelthCopy}
                      alt="Admit Card"
                      className="w-1/2"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    proof of Address
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={data?.ProofOfAddressCopy}
                      alt="Admit Card"
                      className="w-1/2"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Proof of Reserved Category
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={data?.ProofOfReservedCopy}
                      alt="Admit Card"
                      className="w-1/2"
                    />
                  </TableCell>
                  <Link href={data?.ProofOfReservedCopy} Download="Proof of Reserved Category" />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      )}
    </>
  );
}
