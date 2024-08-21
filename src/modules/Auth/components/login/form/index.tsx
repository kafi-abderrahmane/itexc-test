import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSnackBar } from "@/contexts/SnackBarProvider";
import { useDispatch } from "react-redux";

import titleIcon from "@/assets/icon/signinIcon.svg";
import showIcon from "@/assets/icon/Show.svg";
import unshowIcon from "@/assets/icon/unshow.svg";
import googleIcon from "@/assets/icon/Google.svg";
import facebookIcon from "@/assets/icon/Facebook.svg";

import TextField from "@/components/Textfield";
import { Checkbox, FormControlLabel, InputAdornment } from "@mui/material";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Login, signInGoogle, signInFb } from "@/modules/Auth/services/login";
import { setUser } from "@/store/user/reducer";

import "./form.scss";

interface fieldsLogin {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const { setSnack } = useSnackBar();
  const dispatch = useDispatch();
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
    onSubmit: async (values: fieldsLogin) => {
      setLoading(true);
      const { data, error } = await Login({
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
        email: "",
        password: "",
        remember: false,
      });

      dispatch(
        setUser({
          uid: data?.user?.uid || "",
          emailVerified: data?.user?.emailVerified || false,
          email: data?.user?.email || "",
          phoneNumber: data?.user?.providerData[0]?.phoneNumber || "",
          fullname: data?.user?.displayName || "",
          token: data?.accessToken || "",
          refreshToken: data?.user?.refreshToken || "",
          isConnected: true,
          rememberMe: values?.remember,
        })
      );
      setLoading(false);
    },
  });

  const submitGoogle = async () => {
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
        isConnected: true,
        rememberMe: fields?.remember,
      })
    );
    setLoading(false);
  };

  const submitFb = async () => {
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
        isConnected: true,
        rememberMe: fields?.remember,
      })
    );
    setLoading(false);
  };

  return (
    <div className="form">
      <div className="title-box">
        <h1>Welcome To Healthy 24</h1>
        <img src={titleIcon} alt="sign up logo" className="title-img" />
      </div>
      <p>Enter your account to use healthy 24 service</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-box">
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
          <div className="redirect-checked-box">
            <FormControlLabel
              control={
                <Checkbox
                  checked={fields?.remember}
                  onChange={handleChecked}
                  disabled={loading}
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
        <button
          className="button-submit"
          disabled={loading}
          style={{ cursor: loading ? "wait" : "pointer" }}
          type="submit">
          Sign In
        </button>
        <p>Or</p>
        <button
          className="button-google"
          disabled={loading}
          style={{ cursor: loading ? "wait" : "pointer" }}
          onClick={submitGoogle}
          type="button">
          <img src={googleIcon} alt="google logo" />
          Sign Up with google
        </button>
        <button
          className="button-facebook"
          disabled={loading}
          style={{ cursor: loading ? "wait" : "pointer" }}
          onClick={submitFb}
          type="button">
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
