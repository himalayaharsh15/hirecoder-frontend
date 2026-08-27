import { Button, TextField, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "../../App/hook";

import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";

import { loginSchema, type LoginFormData } from "./validation/loginSchema";

import "./loginForm.scss";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../GoggleLoginButton/GoogleLoginButton";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();

      // 🔥 NEW:
      // Store the refresh token outside Redux so that it
      // survives a browser refresh.
      localStorage.setItem("refreshToken", response.refreshToken);

      // Existing Redux authentication state.
      // The access token remains in Redux.
      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        }),
      );
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <section className="login">
      <div className="login__container">
        <h2 className="login__title">Welcome Back</h2>

        <p className="login__subtitle">Login to continue to HireCoder</p>

        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Login"}
          </Button>

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

          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            disabled={isLoading || isGoogleLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
