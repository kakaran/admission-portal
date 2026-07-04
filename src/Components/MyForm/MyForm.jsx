import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AllContext } from "../../Context/Context";
import logo from "../../Assets/image.svg";

const fieldSx = {
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    { borderColor: "#9a031e" },
  "& label.Mui-focused": { color: "#9a031e" },
};

const SectionHeading = ({ children }) => (
  <Typography
    variant="subtitle1"
    sx={{
      color: "#9a031e",
      fontWeight: 700,
      width: "100%",
      mt: 3,
      mb: 1,
      pb: 1,
      borderBottom: "2px solid #9a031e1a",
    }}
  >
    {children}
  </Typography>
);

const FileUploadField = ({ label, id, file, onChange }) => (
  <Grid item xs={12} sm={6}>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} <span className="text-[#9a031e]">*</span>
    </label>
    <label
      htmlFor={id}
      className="flex items-center gap-3 border-2 border-dashed border-gray-300 hover:border-[#9a031e] rounded-xl px-3 py-2.5 cursor-pointer transition-colors bg-gray-50 hover:bg-[#9a031e]/5"
    >
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt={label}
          className="w-11 h-11 object-cover rounded-md shadow shrink-0"
        />
      ) : (
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#9a031e]/10 text-[#9a031e] shrink-0">
          <IoCloudUploadOutline size={18} />
        </span>
      )}
      <span className="text-sm text-gray-600 truncate">
        {file ? file.name : "Click to upload (JPEG/PNG)"}
      </span>
      <input
        type="file"
        id={id}
        className="hidden"
        onChange={onChange}
        accept="image/jpeg, image/png"
      />
    </label>
  </Grid>
);

const MyForm = ({ onBack }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { NotificationMethod } = useContext(AllContext);

  const schema = z.object({
    Email: z.string().nonempty("Email is required").email("Invalid Email"),
    CETRank: z.string().nonempty("CET Rank is required"),
    CETRollNo: z.number(),
    IPUApplicationNo: z.string().nonempty("IPU Application No. is required"),
    NameStudent: z.string().nonempty("Name is required"),
    StudentContacatNo: z
      .number()
      .min(1000000000, "Invalid Contact No.")
      .max(9999999999, "Invalid Contact No."),
    StudentAdharCardNo: z
      .number()
      .min(100000000000, "Invalid Adhar Card No.")
      .max(999999999999, "Invalid Adhar Card No."),
    StudentDOB: z.string().nonempty("Date of Birth is required"),
    FatherName: z.string().nonempty("Father's Name is required"),
    FatherOccupation: z.string().nonempty("Father's Occupation is required"),
    FatherEmailId: z.string(),
    MotherName: z.string().nonempty("Mother's Name is required"),
    MotherContactNo: z
      .number()
      .min(1000000000, "Invalid Contact No.")
      .max(9999999999, "Invalid Contact No."),
    MotherOccupation: z.string().nonempty("Mother's Occupation is required"),
    MotherEmail: z.string(),
    AdmissionCategory: z.string().nonempty("Admission Category is required"),
    AreaOfResidence: z.string().nonempty("Area of Residence is required"),
    Gender: z.string().nonempty("Gender is required"),
    PermanentAddress: z.string().nonempty("Permanent Address is required"),
    CorrespondenceAddress: z
      .string()
      .nonempty("Correspondence Address is required"),
    Religion: z.string().nonempty("Religion is required"),
    Nationality: z.string().nonempty("Nationality is required"),
    TenthPercentage: z
      .number()
      .min(0, "Invalid Percentage")
      .max(100, "Invalid Percentage"),
    TwelthPercentage: z
      .number()
      .min(0, "Invalid Percentage")
      .max(100, "Invalid Percentage"),
  });

  const [admitCardImage, setAdmitCardImage] = useState(null);
  const [studentImage, setStudentImage] = useState(null);
  const [proofOfDOB, setProofOfDOB] = useState(null);
  const [cetRollImage, setCetRollImage] = useState(null);
  const [tenthCopy, setTenthCopy] = useState(null);
  const [twelthCopy, setTwelthCopy] = useState(null);
  const [proofOfAddressCopy, setProofOfAddressCopy] = useState(null);
  const [proofOfReservedCopy, setProofOfReservedCopy] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Email: "",
      CETRank: "",
      CETRollNo: "",
      IPUApplicationNo: "",
      NameStudent: "",
      StudentContacatNo: "",
      StudentAdharCardNo: "",
      StudentDOB: "",
      FatherName: "",
      FatherOccupation: "",
      FatherEmailId: "",
      MotherName: "",
      MotherContactNo: "",
      MotherOccupation: "",
      MotherEmail: "",
      AdmissionCategory: "",
      AreaOfResidence: "",
      Gender: "",
      PermanentAddress: "",
      CorrespondenceAddress: "",
      Religion: "",
      Nationality: "",
      TenthPercentage: "",
      TwelthPercentage: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      const {
        Email,
        CETRank,
        CETRollNo,
        IPUApplicationNo,
        NameStudent,
        StudentContacatNo,
        StudentAdharCardNo,
        StudentDOB,
        FatherName,
        FatherOccupation,
        FatherEmailId,
        MotherName,
        MotherContactNo,
        MotherOccupation,
        MotherEmail,
        AdmissionCategory,
        AreaOfResidence,
        Gender,
        PermanentAddress,
        CorrespondenceAddress,
        Religion,
        Nationality,
        TenthPercentage,
        TwelthPercentage,
      } = values;
      let formData = new FormData();

      if (!admitCardImage)
        return NotificationMethod("Admit Card Image is required", false);
      if (!studentImage)
        return NotificationMethod("Student Image is required", false);
      if (!proofOfDOB)
        return NotificationMethod("Proof of DOB is required", false);
      if (!cetRollImage)
        return NotificationMethod("CET Roll Image is required", false);
      if (!tenthCopy) return NotificationMethod("10th Copy is required", false);
      if (!twelthCopy)
        return NotificationMethod("12th Copy is required", false);
      if (!proofOfReservedCopy)
        return NotificationMethod("Proof of Reserved Copy is required", false);
      if (!proofOfAddressCopy)
        return NotificationMethod("Proof of Address Copy is required", false);

      formData.append("Email", Email);
      formData.append("CETRank", CETRank);
      formData.append("CETRollNo", CETRollNo);
      formData.append("IPUApplicationNo", IPUApplicationNo);
      formData.append("NameStudent", NameStudent);
      formData.append("StudentContacatNo", StudentContacatNo);
      formData.append("StudentAdharCardNo", StudentAdharCardNo);
      formData.append("DOB", StudentDOB);
      formData.append("FatherName", FatherName);
      formData.append("FatherOccupation", FatherOccupation);
      formData.append("FatherEmailId", FatherEmailId);
      formData.append("MotherName", MotherName);
      formData.append("MotherContactNo", MotherContactNo);
      formData.append("MotherOccupation", MotherOccupation);
      formData.append("MotherEmail", MotherEmail);
      formData.append("AdmissionCategory", AdmissionCategory);
      formData.append("AreaOfResidence", AreaOfResidence);
      formData.append("Gender", Gender);
      formData.append("PermanentAddress", PermanentAddress);
      formData.append("CorrespondenceAddress", CorrespondenceAddress);
      formData.append("Religion", Religion);
      formData.append("Nationality", Nationality);
      formData.append("TenthPercentage", TenthPercentage);
      formData.append("TwelthPercentage", TwelthPercentage);
      formData.append("AdmitCardCopy", admitCardImage, admitCardImage.name);
      formData.append("ProofOfDateOfBirthCopy", proofOfDOB, proofOfDOB.name);
      formData.append("CETRollNoCopy", cetRollImage, cetRollImage.name);
      formData.append("TenthCopy", tenthCopy, tenthCopy.name);
      formData.append("TwelthCopy", twelthCopy, twelthCopy.name);
      formData.append("StudentImage", studentImage, studentImage.name);
      formData.append(
        "ProofOfReservedCopy",
        proofOfReservedCopy,
        proofOfReservedCopy.name
      );
      formData.append(
        "ProofOfAddressCopy",
        proofOfAddressCopy,
        proofOfAddressCopy.name
      );

      const { data } = await axios.post(
        `${BASE_URL}/api/formCreated`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      NotificationMethod(data.message, data.status);
    } catch (error) {
      console.log(error);
      NotificationMethod(
        error.response?.data.message,
        error.response?.data.status
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf3f0] to-white py-10">
      <Container component="main" maxWidth="md">
        <CssBaseline />
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#9a031e] hover:underline mb-3"
          >
            <IoMdArrowBack size={16} />
            Back to options
          </button>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(154, 3, 30, 0.08)",
            px: { xs: 3, sm: 5 },
            py: 4,
          }}
        >
          <img src={logo} alt="SGTBIMIT" width="56" height="56" />
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "#9a031e", fontWeight: 700, mt: 1 }}
          >
            Sri Guru Tegh Bahadur Institute of Management and Information
            Technology
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 1 }}
          >
            Registration Form for Management Quota Admission
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: "100%" }}
          >
            <SectionHeading>Application Details</SectionHeading>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  {...register("Email")}
                  error={!!errors.Email}
                  helperText={errors.Email?.message}
                  fullWidth
                  autoComplete="email"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="CETRank"
                  label="CET Rank"
                  variant="outlined"
                  {...register("CETRank")}
                  error={!!errors.CETRank}
                  helperText={errors.CETRank?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="CETRollNo"
                  label="CET Roll No."
                  variant="outlined"
                  {...register("CETRollNo", { valueAsNumber: true })}
                  error={!!errors.CETRollNo}
                  helperText={errors.CETRollNo?.message}
                  fullWidth
                  type="number"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="IPUApplicationNo"
                  label="IPU Application No."
                  variant="outlined"
                  {...register("IPUApplicationNo")}
                  error={!!errors.IPUApplicationNo}
                  helperText={errors.IPUApplicationNo?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
            </Grid>

            <SectionHeading>Student Details</SectionHeading>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="NameStudent"
                  label="Student's Name"
                  variant="outlined"
                  {...register("NameStudent")}
                  error={!!errors.NameStudent}
                  helperText={errors.NameStudent?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="StudentContacatNo"
                  label="Student's Contact No."
                  variant="outlined"
                  {...register("StudentContacatNo", { valueAsNumber: true })}
                  error={!!errors.StudentContacatNo}
                  helperText={errors.StudentContacatNo?.message}
                  fullWidth
                  type="number"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="StudentAdharCardNo"
                  label="Student's Aadhaar Card No."
                  variant="outlined"
                  {...register("StudentAdharCardNo", { valueAsNumber: true })}
                  error={!!errors.StudentAdharCardNo}
                  helperText={errors.StudentAdharCardNo?.message}
                  fullWidth
                  type="number"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="StudentDOB"
                  label="Student's Date of Birth"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  {...register("StudentDOB")}
                  error={!!errors.StudentDOB}
                  helperText={errors.StudentDOB?.message}
                  fullWidth
                  type="date"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={fieldSx}>
                  <InputLabel id="Gender">Gender</InputLabel>
                  <Select
                    labelId="Gender"
                    id="Gender-Select"
                    label="Gender"
                    {...register("Gender")}
                    error={!!errors.Gender}
                    fullWidth
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <SectionHeading>Parent / Guardian Details</SectionHeading>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="FatherName"
                  label="Father's Name"
                  variant="outlined"
                  {...register("FatherName")}
                  error={!!errors.FatherName}
                  helperText={errors.FatherName?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="FatherOccupation"
                  label="Father's Occupation"
                  variant="outlined"
                  {...register("FatherOccupation")}
                  error={!!errors.FatherOccupation}
                  helperText={errors.FatherOccupation?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="FatherEmailId"
                  label="Father's Email"
                  variant="outlined"
                  {...register("FatherEmailId")}
                  error={!!errors.FatherEmailId}
                  helperText={errors.FatherEmailId?.message}
                  fullWidth
                  type="email"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="MotherName"
                  label="Mother's Name"
                  variant="outlined"
                  {...register("MotherName")}
                  error={!!errors.MotherName}
                  helperText={errors.MotherName?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="MotherContactNo"
                  label="Mother's Contact No."
                  variant="outlined"
                  {...register("MotherContactNo", { valueAsNumber: true })}
                  error={!!errors.MotherContactNo}
                  helperText={errors.MotherContactNo?.message}
                  fullWidth
                  type="number"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="MotherOccupation"
                  label="Mother's Occupation"
                  variant="outlined"
                  {...register("MotherOccupation")}
                  error={!!errors.MotherOccupation}
                  helperText={errors.MotherOccupation?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="MotherEmail"
                  label="Mother's Email"
                  variant="outlined"
                  {...register("MotherEmail")}
                  error={!!errors.MotherEmail}
                  helperText={errors.MotherEmail?.message}
                  fullWidth
                  type="email"
                  sx={fieldSx}
                />
              </Grid>
            </Grid>

            <SectionHeading>Category & Address</SectionHeading>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={fieldSx}>
                  <InputLabel id="AdmissionCategory">Category</InputLabel>
                  <Select
                    labelId="AdmissionCategory"
                    id="Admission-Category-Select"
                    label="Category"
                    {...register("AdmissionCategory")}
                    error={!!errors.AdmissionCategory}
                    fullWidth
                  >
                    <MenuItem value={"General"}>General</MenuItem>
                    <MenuItem value={"General (Out Side Delhi)"}>
                      General (Out Side Delhi)
                    </MenuItem>
                    <MenuItem value={"SC"}>SC</MenuItem>
                    <MenuItem value={"SC (Out Side Delhi)"}>
                      SC (Out Side Delhi)
                    </MenuItem>
                    <MenuItem value={"ST"}>ST</MenuItem>
                    <MenuItem value={"OBC"}>OBC</MenuItem>
                    <MenuItem value={"PH"}>PH</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={fieldSx}>
                  <InputLabel id="AreaOfResidence">
                    Area of Residence
                  </InputLabel>
                  <Select
                    labelId="AreaOfResidence"
                    id="Area-Of-Residence-Select"
                    label="Area Of Residence"
                    {...register("AreaOfResidence")}
                    error={!!errors.AreaOfResidence}
                    fullWidth
                  >
                    <MenuItem value={"Rural"}>Rural</MenuItem>
                    <MenuItem value={"Urban"}>Urban</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="Religion"
                  label="Religion"
                  variant="outlined"
                  {...register("Religion")}
                  error={!!errors.Religion}
                  helperText={errors.Religion?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="Nationality"
                  label="Nationality"
                  variant="outlined"
                  {...register("Nationality")}
                  error={!!errors.Nationality}
                  helperText={errors.Nationality?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="PermanentAddress"
                  label="Permanent Address"
                  variant="outlined"
                  {...register("PermanentAddress")}
                  error={!!errors.PermanentAddress}
                  helperText={errors.PermanentAddress?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="CorrespondenceAddress"
                  label="Correspondence Address"
                  variant="outlined"
                  {...register("CorrespondenceAddress")}
                  error={!!errors.CorrespondenceAddress}
                  helperText={errors.CorrespondenceAddress?.message}
                  fullWidth
                  type="text"
                  sx={fieldSx}
                />
              </Grid>
            </Grid>

            <SectionHeading>Academic Details</SectionHeading>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="TenthPercentage"
                  label="10th Percentage"
                  variant="outlined"
                  {...register("TenthPercentage", { valueAsNumber: true })}
                  error={!!errors.TenthPercentage}
                  helperText={errors.TenthPercentage?.message}
                  fullWidth
                  type="number"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="TwelthPercentage"
                  label="12th Percentage"
                  variant="outlined"
                  {...register("TwelthPercentage", { valueAsNumber: true })}
                  error={!!errors.TwelthPercentage}
                  helperText={errors.TwelthPercentage?.message}
                  fullWidth
                  type="number"
                  sx={fieldSx}
                />
              </Grid>
            </Grid>

            <SectionHeading>Document Uploads</SectionHeading>
            <Grid container spacing={2}>
              <FileUploadField
                label="Admit Card Image"
                id="admitcardimage"
                file={admitCardImage}
                onChange={(e) =>
                  setAdmitCardImage(e.target.files.length ? e.target.files[0] : null)
                }
              />
              <FileUploadField
                label="Student Image"
                id="studentimage"
                file={studentImage}
                onChange={(e) =>
                  setStudentImage(e.target.files.length ? e.target.files[0] : null)
                }
              />
              <FileUploadField
                label="Proof of DOB"
                id="proofofdob"
                file={proofOfDOB}
                onChange={(e) =>
                  setProofOfDOB(e.target.files.length ? e.target.files[0] : null)
                }
              />
              <FileUploadField
                label="CET Roll Image"
                id="cetrollimage"
                file={cetRollImage}
                onChange={(e) =>
                  setCetRollImage(e.target.files.length ? e.target.files[0] : null)
                }
              />
              <FileUploadField
                label="10th Copy"
                id="tenthcopy"
                file={tenthCopy}
                onChange={(e) =>
                  setTenthCopy(e.target.files.length ? e.target.files[0] : null)
                }
              />
              <FileUploadField
                label="12th Copy"
                id="twelthcopy"
                file={twelthCopy}
                onChange={(e) =>
                  setTwelthCopy(e.target.files.length ? e.target.files[0] : null)
                }
              />
              <FileUploadField
                label="Proof of Reserved Copy"
                id="proofOfReservedCopy"
                file={proofOfReservedCopy}
                onChange={(e) =>
                  setProofOfReservedCopy(e.target.files.length ? e.target.files[0] : null)
                }
              />
              <FileUploadField
                label="Proof of Address Copy"
                id="setProofOfAddressCopy"
                file={proofOfAddressCopy}
                onChange={(e) =>
                  setProofOfAddressCopy(e.target.files.length ? e.target.files[0] : null)
                }
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                bgcolor: "#9a031e",
                "&:hover": { bgcolor: "#7a0218" },
                borderRadius: 2,
                py: 1.2,
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default MyForm;
