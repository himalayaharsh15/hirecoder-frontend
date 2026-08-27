import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hook";

import {
  useGoogleLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authApi";

import { registerSchema, type RegisterFormData } from "./registerSchema";

import "./register.scss";
import { useState } from "react";
import GoogleLoginButton from "../../components/GoggleLoginButton/GoogleLoginButton";
import { setCredentials } from "../../features/auth/authSlice";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const dispatch = useAppDispatch();

  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();

  const [registerUser, { isLoading }] = useRegisterMutation();

  /**
   * ============================================================
   * Google Login
   * ============================================================
   *
   * Google returns a verified ID-token credential to the frontend.
   *
   * We send that credential to our backend.
   * The backend verifies it with Google and returns the normal
   * HireCoder access + refresh tokens.
   */
  const handleGoogleSuccess = async (credential: string) => {
    try {
      const response = await googleLogin({
        credential,
      }).unwrap();

      // Store refresh token so authentication can survive
      // a browser refresh.
      localStorage.setItem("refreshToken", response.refreshToken);

      // Store the same authentication state used by
      // normal email/password login.
      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        }),
      );

      // Send the authenticated user to the dashboard.
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");

      await registerUser(data).unwrap();

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      setServerError(
        error?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <section className="register">
      <div className="register__container">
        <h2 className="register__title">Create Your Account</h2>

        <p className="register__subtitle">
          Join HireCoder and start your journey.
        </p>

        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            disabled={isGoogleLoading}
          />
          <Divider
            sx={{
              my: 2.5,
              color: "text.secondary",
              fontSize: "0.75rem",
              "&::before, &::after": {
                borderColor: "divider",
              },
            }}
          >
            Or
          </Divider>
          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <FormControl fullWidth error={!!errors.role}>
            <InputLabel id="register-role-label">Account Type</InputLabel>

            <Select
              labelId="register-role-label"
              label="Account Type"
              defaultValue=""
              {...register("role")}
            >
              <MenuItem value="CANDIDATE">Candidate</MenuItem>

              <MenuItem value="RECRUITER">Recruiter</MenuItem>
            </Select>

            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>

          {serverError && (
            <div className="register__server-error">{serverError}</div>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
