import React, { useState } from "react";

import { Link } from "react-router-dom";

import titleIcon from "@/assets/icon/signupIcon.svg";
import googleIcon from "@/assets/icon/Google.svg";
import facebookIcon from "@/assets/icon/Facebook.svg";

import TextField from "@/components/Textfield";
import { Checkbox, FormControlLabel } from "@mui/material";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import "./form.scss";

interface fieldsSignUp {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

const SignUpForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fields, setFields] = useState<fieldsSignUp>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev: fieldsSignUp) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev: fieldsSignUp) => ({
      ...prev,
      agreement: e?.target?.checked,
    }));
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "FullName must be at least 3 characters long")
      .required("FullName is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .min(6, "must be greater than 6 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .min(6, "must be greater than 6 characters long")
      .required("Confirm password is required"),
    agreement: Yup.boolean().oneOf([true], "required").required("required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: fields.fullName,
      email: fields.email,
      password: fields.password,
      confirmPassword: fields.confirmPassword,
      agreement: fields.agreement,
    },
    validationSchema,
    onSubmit: (values: fieldsSignUp) => {
      console.log(values);
    },
  });

  return (
    <div className="form">
      <div className="title-box">
        <h1>Sing up your account</h1>
        <img src={titleIcon} alt="sign up logo" />
      </div>
      <p>Let’s Enter your data to continue use healthy 24 services</p>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="form-box">
          <TextField
            id="fullName"
            name="fullName"
            label="fullName"
            value={fields?.fullName}
            onChange={handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            id="email"
            name="email"
            label="email"
            value={fields?.email}
            onChange={handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="password"
            value={fields?.password}
            onChange={handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="confirm Password"
            value={fields?.confirmPassword}
            onChange={handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={fields?.agreement}
                onChange={handleChecked}
                id="agreement"
                name="agreement"
                sx={{
                  "&.Mui-checked": {
                    color: "#192252",
                  },
                }}
              />
            }
            label={
              <p
                className="label-checked"
                style={{
                  color:
                    formik.touched.agreement && Boolean(formik.errors.agreement)
                      ? "#d32f2f"
                      : "#192252",
                }}>
                by sign up to healthy 24 you agree all <span>term</span> and{" "}
                <span>condition</span>
              </p>
            }
          />
        </div>
        <button className="button-submit" type="submit">
          Sign Up
        </button>
        <p>Or</p>
        <button className="button-google" type="button">
          <img src={googleIcon} alt="google logo" />
          Sign Up with google
        </button>
        <button className="button-facebook" type="button">
          <img src={facebookIcon} alt="facebook logo" />
          Sign Up with facebook
        </button>
        <p>
          You Already have account ?{" "}
          <Link to="/sign-in">
            <span className="signin-redirect">Sign in</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
