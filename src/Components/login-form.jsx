import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LoginForm = ({ onSubmit }) => {
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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
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
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            {...register("Password")}
            error={!!errors.Password}
            helperText={errors.Password?.message}
            fullWidth
            type="password"
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOGIN
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to="#"
                variant="body2"
                style={{ textDecoration: "underline", color: "blue" }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/signup"
                variant="body2"
                style={{ textDecoration: "underline", color: "blue" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
