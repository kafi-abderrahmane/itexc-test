import React, { useState } from "react";

import titleIcon from "@/assets/icon/forgetPasswordIcon.svg";

import TextField from "@/components/Textfield";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import "./form.scss";

interface fieldsForgetPassword {
  email: string;
}

const ForgetPasswordForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fields, setFields] = useState<fieldsForgetPassword>({
    email: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev: fieldsForgetPassword) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: fields.email,
    },
    validationSchema,
    onSubmit: (values: fieldsForgetPassword) => {
      console.log(values);
    },
  });

  return (
    <div className="form">
      <div className="title-box">
        <h1>Forget Password</h1>
        <img src={titleIcon} alt="sign up logo" />
      </div>
      <p>Enter your email to recover password</p>
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
        </div>
        <button className="button-submit" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
