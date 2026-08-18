import {
  Button,
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

import { useRegisterMutation } from "../../features/auth/authApi";

import { registerSchema, type RegisterFormData } from "./registerSchema";

import "./register.scss";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data).unwrap();

      console.log("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);
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
