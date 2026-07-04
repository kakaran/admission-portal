import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AllContext } from "../../Context/Context";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/image.svg";

const Signup = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { setAuth, NotificationMethod } = useContext(AllContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    FirstName: z.string().nonempty("Name is required."),
    LastName: z.string().nonempty("Last Name is required."),
    Email: z
      .string()
      .nonempty("Email is required.")
      .email("Invalid email format."),
    Password: z
      .string()
      .nonempty("Password is required.")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Please enter a string password containing at least one lower case letter, one upper case character, one number, one special character and must be at least 8 characters long in length."
      ),
    PhoneNo: z
      .number()
      .min(1000000000, "Please enter a 10 digit number")
      .max(9999999999, "Please enter a 10 digit number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PhoneNo: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const SignupSubmit = async (values) => {
    try {
      const { FirstName, LastName, Email, Password, PhoneNo } = values;
      const Data = (
        await axios.post(`${BASE_URL}/api/signup`, {
          FName: FirstName,
          LName: LastName,
          Email,
          Password,
          PhoneNo,
        })
      ).data;
      if (Data) {
        const { token } = Data
        localStorage.setItem("auth", JSON.stringify(token));
        setAuth({
          token,
        });
        navigate("/Dashbord");
      }
      NotificationMethod(Data.message, Data.status);
    } catch (error) {
      NotificationMethod(
        error.response.data.message,
        error.response.data.status
      );
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      { borderColor: "#9a031e" },
    "& label.Mui-focused": { color: "#9a031e" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf3f0] to-white flex items-center justify-center flex-col px-4 py-10">
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="SGTBIMIT" width="64" height="64" />
        <p className="mt-2 text-[#9a031e] font-semibold tracking-wide text-lg">
          SGTBIMIT
        </p>
        <p className="text-gray-500 text-sm">Admission Portal</p>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Avatar sx={{ m: 1, bgcolor: "#9a031e" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "#9a031e", fontWeight: 600 }}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(SignupSubmit)}
            sx={{ mt: 2, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("FirstName")}
                  error={!!errors.FirstName}
                  helperText={errors?.FirstName?.message}
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  {...register("LastName")}
                  error={!!errors.LastName}
                  helperText={errors?.LastName?.message}
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone number"
                  autoComplete="phone-number"
                  {...register("PhoneNo", {
                    valueAsNumber: true,
                  })}
                  error={!!errors.PhoneNo}
                  helperText={
                    errors?.PhoneNo?.type === "invalid_type"
                      ? "Please enter a number"
                      : errors?.PhoneNo?.message
                  }
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("Email")}
                  error={!!errors.Email}
                  helperText={errors?.Email?.message}
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  {...register("Password")}
                  error={!!errors.Password}
                  helperText={errors?.Password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={fieldSx}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#9a031e",
                "&:hover": { bgcolor: "#7a0218" },
                borderRadius: 2,
                py: 1.2,
              }}
            >
              Sign Up
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <RouterLink
                to="/"
                style={{
                  textDecoration: "underline",
                  color: "#9a031e",
                  fontSize: "0.875rem",
                }}
              >
                Already have an account? Sign in
              </RouterLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
