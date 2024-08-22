import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useSnackBar } from "@/contexts/SnackBarProvider";
import { useDispatch } from "react-redux";

import titleIcon from "@/assets/icon/signupIcon.svg";
import showIcon from "@/assets/icon/Show.svg";
import unshowIcon from "@/assets/icon/unshow.svg";
import googleIcon from "@/assets/icon/Google.svg";
import facebookIcon from "@/assets/icon/Facebook.svg";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import TextField from "@/components/Textfield";
import { Checkbox, FormControlLabel, InputAdornment } from "@mui/material";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { signUp } from "@/modules/Auth/services/signUp";
import { signInGoogle, signInFb } from "@/modules/Auth/services/login";
import { setUser } from "@/store/user/reducer";

import "./form.scss";

interface fieldsSignUp {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

const SignUpForm: React.FC = () => {
  const { setSnack } = useSnackBar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [created, setCreated] = useState<boolean>(false);
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
    onSubmit: async (values: fieldsSignUp) => {
      setLoading(true);
      const { data, error } = await signUp({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      if (error) {
        setSnack({
          open: true,
          type: "error",
          message: error?.message,
        });
        setLoading(false);
        return;
      }

      setFields({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreement: false,
      });
      setCreated(true);
      setLoading(false);
    },
  });

  const submitGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true);
    const { data, error } = await signInGoogle();

    if (error) {
      setSnack({
        open: true,
        type: "error",
        message: error?.message,
      });
      setLoading(false);
      return;
    }
    dispatch(
      setUser({
        uid: data?.user?.uid || "",
        emailVerified: data?.user?.emailVerified || false,
        email: data?.user?.email || "",
        phoneNumber: data?.user?.providerData[0]?.phoneNumber || "",
        fullname: data?.user?.displayName || "",
        token: data?.accessToken || "",
        refreshToken: data?.user?.refreshToken || "",
        rememberMe: true,
      })
    );
    setLoading(false);
  };

  const submitFb = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true);
    const { data, error } = await signInFb();

    if (error) {
      setSnack({
        open: true,
        type: "error",
        message: error?.message,
      });
      setLoading(false);
      return;
    }
    dispatch(
      setUser({
        uid: data?.user?.uid || "",
        emailVerified: data?.user?.emailVerified || false,
        email: data?.user?.email || "",
        phoneNumber: data?.user?.providerData[0]?.phoneNumber || "",
        fullname: data?.user?.displayName || "",
        token: data?.accessToken || "",
        refreshToken: data?.user?.refreshToken || "",
        rememberMe: true,
      })
    );
    setLoading(false);
  };

  return (
    <div className="form">
      <div className="title-box">
        <h1>Sing up your account</h1>
        <img src={titleIcon} alt="sign up logo" className="title-img" />
      </div>
      <p>Let’s Enter your data to continue use healthy 24 services</p>
      {created ? (
        <div className="created">
          <div className="verification">
            <CheckCircleOutlineIcon className="icon" />
            <p>Account created, check your email to verify registration.</p>
          </div>
          <p>
            You Already have account ?{" "}
            <Link to="/sign-in">
              <span className="signin-redirect">Sign in</span>
            </Link>
          </p>
        </div>
      ) : (
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <div className="form-box">
            <TextField
              id="fullName"
              name="fullName"
              label="fullName"
              type="text"
              disabled={loading}
              placeholder="Enter Your name here"
              value={fields?.fullName}
              onChange={handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              id="email"
              name="email"
              label="email"
              type="text"
              disabled={loading}
              placeholder="Enter Your email here"
              value={fields?.email}
              onChange={handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="password"
              type={showPassword ? "text" : "password"}
              disabled={loading}
              placeholder="Enter Your Password here"
              value={fields?.password}
              onChange={handleChange}
              InputProps={{
                style: {
                  fontFamily: "Poppins, system-ui",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <button
                      type="button"
                      className="show-button"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <img src={unshowIcon} alt="unshow logo" />
                      ) : (
                        <img src={showIcon} alt="show logo" />
                      )}
                    </button>
                  </InputAdornment>
                ),
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="confirm Password"
              type={showPassword ? "text" : "password"}
              disabled={loading}
              placeholder="Enter confirm Password here"
              value={fields?.confirmPassword}
              onChange={handleChange}
              InputProps={{
                style: {
                  fontFamily: "Poppins, system-ui",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <button
                      type="button"
                      className="show-button"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <img src={unshowIcon} alt="unshow logo" />
                      ) : (
                        <img src={showIcon} alt="show logo" />
                      )}
                    </button>
                  </InputAdornment>
                ),
              }}
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
                  disabled={loading}
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
                      formik.touched.agreement &&
                      Boolean(formik.errors.agreement)
                        ? "#d32f2f"
                        : "#192252",
                  }}>
                  by sign up to healthy 24 you agree all <span>term</span> and{" "}
                  <span>condition</span>
                </p>
              }
            />
          </div>
          <button
            className="button-submit"
            disabled={loading}
            style={{ cursor: loading ? "wait" : "pointer" }}
            type="submit">
            Sign Up
          </button>
          <p>Or</p>
          <button
            className="button-google"
            style={{ cursor: loading ? "wait" : "pointer" }}
            disabled={loading}
            onClick={submitGoogle}
            type="button">
            <img src={googleIcon} alt="google logo" />
            Sign Up with google
          </button>
          <button
            className="button-facebook"
            style={{ cursor: loading ? "wait" : "pointer" }}
            disabled={loading}
            onClick={submitFb}
            type="button">
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
      )}
    </div>
  );
};

export default SignUpForm;
