import React, { useState } from "react";

import { Link } from "react-router-dom";

import titleIcon from "@/assets/icon/signinIcon.svg";
import googleIcon from "@/assets/icon/Google.svg";
import facebookIcon from "@/assets/icon/Facebook.svg";

import TextField from "@/components/Textfield";
import { Checkbox, FormControlLabel } from "@mui/material";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import "./form.scss";

interface fieldsLogin {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fields, setFields] = useState<fieldsLogin>({
    email: "",
    password: "",
    remember: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev: fieldsLogin) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev: fieldsLogin) => ({
      ...prev,
      remember: e?.target?.checked,
    }));
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .min(6, "must be greater than 6 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: fields.email,
      password: fields.password,
      remember: fields?.remember,
    },
    validationSchema,
    onSubmit: (values: fieldsLogin) => {
      console.log(values);
    },
  });

  return (
    <div className="form">
      <div className="title-box">
        <h1>Welcome To Healthy 24</h1>
        <img src={titleIcon} alt="sign up logo" />
      </div>
      <p>Enter your account to use healthy 24 service</p>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="form-box">
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
          <div className="redirect-checked-box">
            <FormControlLabel
              control={
                <Checkbox
                  checked={fields?.remember}
                  onChange={handleChecked}
                  id="remember"
                  name="remember"
                  sx={{
                    "&.Mui-checked": {
                      color: "#192252",
                    },
                  }}
                />
              }
              label={<p className="label-checked">Remember me</p>}
            />
            <Link to="/forget-password">
              <span className="forget-password-redirect">Forget password</span>
            </Link>
          </div>
        </div>
        <button className="button-submit" type="submit">
          Sign In
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
          You don’thave account ?{" "}
          <Link to="/sign-up">
            <span className="signup-redirect">Sign up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
