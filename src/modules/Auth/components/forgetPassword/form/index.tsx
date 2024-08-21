import React, { useState } from "react";

import { useSnackBar } from "@/contexts/SnackBarProvider";

import titleIcon from "@/assets/icon/forgetPasswordIcon.svg";

import TextField from "@/components/Textfield";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { resetPassword } from "@/modules/Auth/services/login";

import "./form.scss";
import { useNavigate } from "react-router-dom";

interface fieldsForgetPassword {
  email: string;
}

const ForgetPasswordForm: React.FC = () => {
  const { setSnack } = useSnackBar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
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
    onSubmit: async (values: fieldsForgetPassword) => {
      setLoading(true);
      const { data, error } = await resetPassword(values.email);

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
      });
      setSnack({
        open: true,
        type: "success",
        message: "Email sent",
      });
      navigate("/sign-in");
      setLoading(false);
    },
  });

  return (
    <div className="form">
      <div className="title-box">
        <h1>Forget Password</h1>
        <img src={titleIcon} alt="sign up logo" />
      </div>
      <p>Enter your email to recover password</p>
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
        </div>
        <button
          className="button-submit"
          disabled={loading}
          style={{ cursor: loading ? "wait" : "pointer" }}
          type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
