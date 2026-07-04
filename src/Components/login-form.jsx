import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  CssBaseline,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    Email: z.string().nonempty("Email is required").email("Invalid Email"),
    Password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Minimum 8 characters"),
  });

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const { errors } = formState;

  return (
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
          Sign in
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            {...register("Email")}
            error={!!errors.Email}
            helperText={errors.Email?.message}
            fullWidth
            autoComplete="email"
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#9a031e" },
              "& label.Mui-focused": { color: "#9a031e" },
            }}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            {...register("Password")}
            error={!!errors.Password}
            helperText={errors.Password?.message}
            fullWidth
            type={showPassword ? "text" : "password"}
            margin="normal"
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
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#9a031e" },
              "& label.Mui-focused": { color: "#9a031e" },
            }}
          />
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
            LOGIN
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link
              to="#"
              style={{
                textDecoration: "underline",
                color: "#9a031e",
                fontSize: "0.875rem",
              }}
            >
              Forgot password?
            </Link>
            <Link
              to="/signup"
              style={{
                textDecoration: "underline",
                color: "#9a031e",
                fontSize: "0.875rem",
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
