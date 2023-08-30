import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AllContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const Signup = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { NotificationMethod } = useContext(AllContext);
  const navigate = useNavigate();

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
      console.log(values);
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
        navigate("/");
      }
      NotificationMethod(Data.message, Data.status);
    } catch (error) {
      NotificationMethod(
        error.response.data.message,
        error.response.data.status
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(SignupSubmit)}
            sx={{ mt: 3 }}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("Password")}
                  error={!!errors.Password}
                  helperText={errors?.Password?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
