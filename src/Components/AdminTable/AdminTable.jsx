import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const LIMIT = 10;

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Submitted", value: "Submitted" },
  { label: "Downloaded (not submitted)", value: "Downloaded" },
  { label: "Filling E-Form", value: "In Progress" },
  { label: "Not Started", value: "Not Started" },
];

const STATUS_STYLES = {
  Submitted: "bg-green-100 text-green-700",
  Downloaded: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Not Started": "bg-gray-100 text-gray-500",
};

const getStatus = (student) => {
  if (student.FormId) return "Submitted";
  if (student.SubmissionMethod === "Download") return "Downloaded";
  if (student.SubmissionMethod === "EForm") return "In Progress";
  return "Not Started";
};

const METHOD_LABELS = {
  Download: "Downloaded PDF",
  EForm: "E-Form",
};

const METHOD_ICONS = {
  Download: <IoMdDownload size={14} />,
  EForm: <HiOutlinePencilSquare size={14} />,
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const fetchData = ({ page, status, search }) =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/StudentApplications`, {
    params: { page, limit: LIMIT, status: status || undefined, search: search || undefined },
  });

export default function AdminTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [status, search]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["AdminTable", page, status, search],
    queryFn: () => fetchData({ page, status, search }),
    keepPreviousData: true,
  });

  const rows = data?.data?.students;
  const totalPages = data?.data?.totalPages || 1;
  const total = data?.data?.total || 0;

  return (
    <div className="mt-5">
      <div className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-4 flex flex-wrap gap-3 items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1 min-w-[220px] focus:outline-none focus:border-[#9a031e]"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#9a031e]"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {isError && (
        <div className="bg-white border border-red-100 text-red-600 rounded-2xl shadow-sm p-6">
          {error.response?.data?.message || "Failed to load applications."}
        </div>
      )}

      {isLoading && (
        <div className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-6">
          <Skeleton animation="wave" height={30} />
          <Skeleton animation="wave" height={30} />
          <Skeleton animation="wave" height={30} />
        </div>
      )}

      {!isLoading && !isError && !rows?.length && (
        <div className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-10 flex flex-col items-center text-center">
          <p className="text-gray-700 font-medium">No students found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your search or filter.
          </p>
        </div>
      )}

      {!isLoading && !isError && !!rows?.length && (
        <>
          <p className="text-sm text-gray-500 mb-2">
            {total} student{total === 1 ? "" : "s"}
          </p>

          <div className="md:hidden space-y-3">
            {rows.map((row) => {
              const form = row.FormId;
              const studentStatus = getStatus(row);
              const name =
                form?.NameStudent || `${row.FName || ""} ${row.LName || ""}`.trim();
              return (
                <div
                  key={row._id}
                  onClick={() => navigate(`/student/${row._id}`)}
                  className="bg-white border border-[#9a031e]/10 rounded-2xl shadow-sm p-4 cursor-pointer active:bg-[#9a031e]/5"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#9a031e]/10 text-[#9a031e] text-xs font-semibold shrink-0">
                      {initials(name) || "?"}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">{name || "—"}</p>
                      <p className="text-xs text-gray-400 truncate">
                        {form?.Email || row.Email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="text-gray-700">{form?.StudentContacatNo || row.PhoneNo || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Category</p>
                      {form?.AdmissionCategory ? (
                        <span className="bg-[#9a031e]/10 text-[#9a031e] text-xs font-medium px-2.5 py-1 rounded-full">
                          {form.AdmissionCategory}
                        </span>
                      ) : (
                        <p className="text-gray-700">—</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Method</p>
                      {row.SubmissionMethod ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600">
                          {METHOD_ICONS[row.SubmissionMethod]}
                          {METHOD_LABELS[row.SubmissionMethod]}
                        </span>
                      ) : (
                        <p className="text-gray-700">—</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Status</p>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[studentStatus]}`}
                      >
                        {studentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <TableContainer
            component={Paper}
            elevation={0}
            className="hidden md:block border border-[#9a031e]/10 !rounded-2xl !shadow-sm"
          >
            <Table sx={{ minWidth: 650 }} aria-label="student applications table">
              <TableHead>
                <TableRow>
                  {["Name", "Email", "Phone", "Category", "Method", "Status"].map((head) => (
                    <TableCell
                      key={head}
                      align="center"
                      sx={{ color: "#9a031e", fontWeight: 700, bgcolor: "#9a031e0d" }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  const form = row.FormId;
                  const studentStatus = getStatus(row);
                  const name =
                    form?.NameStudent || `${row.FName || ""} ${row.LName || ""}`.trim();
                  return (
                    <TableRow
                      key={row._id}
                      hover
                      sx={{
                        cursor: "pointer",
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      onClick={() => navigate(`/student/${row._id}`)}
                    >
                      <TableCell component="th" scope="row">
                        <div className="flex items-center gap-2.5">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#9a031e]/10 text-[#9a031e] text-xs font-semibold shrink-0">
                            {initials(name) || "?"}
                          </span>
                          {name}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {form?.Email || row.Email}
                      </TableCell>
                      <TableCell align="center">
                        {form?.StudentContacatNo || row.PhoneNo}
                      </TableCell>
                      <TableCell align="center">
                        {form?.AdmissionCategory ? (
                          <span className="bg-[#9a031e]/10 text-[#9a031e] text-xs font-medium px-2.5 py-1 rounded-full">
                            {form.AdmissionCategory}
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.SubmissionMethod ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600">
                            {METHOD_ICONS[row.SubmissionMethod]}
                            {METHOD_LABELS[row.SubmissionMethod]}
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[studentStatus]}`}
                        >
                          {studentStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <div className="flex justify-center mt-5">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                shape="rounded"
                sx={{
                  "& .Mui-selected": {
                    bgcolor: "#9a031e !important",
                    color: "#fff",
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
