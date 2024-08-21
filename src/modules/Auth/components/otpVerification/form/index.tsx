import React, { useState } from "react";

import titleIcon from "@/assets/icon/OtpVerificationIcon.svg";
import { Link } from "react-router-dom";

import OtpInput from "react-otp-input";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import "./form.scss";
import { useMediaQuery } from "@mui/material";

interface fieldsOtpVerification {
  code: string;
}

const OtpVerificationForm: React.FC = () => {
  const matche = useMediaQuery("(max-width:768px)");
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<fieldsOtpVerification>({
    code: "",
  });
  const handleChange = (e: string) => {
    setFields((prev: fieldsOtpVerification) => ({
      ...prev,
      code: e,
    }));
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("code is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: fields.code,
    },
    validationSchema,
    onSubmit: (values: fieldsOtpVerification) => {
      console.log(values);
    },
  });

  return (
    <div className="form">
      <div className="title-box">
        <h1>OTP Verification</h1>
        <img src={titleIcon} alt="sign up logo" />
      </div>
      <p>
        Our team already sent you an email in your inbox{" "}
        <span>seddikwalid@gamil.com</span> to Access back your account
      </p>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="form-box">
          <OtpInput
            value={fields?.code}
            onChange={handleChange}
            numInputs={6}
            containerStyle={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: matche ? "8px" : "12px",
              justifyContent: "center",
            }}
            inputStyle={{
              border: "1px solid #D0D0D0",
              borderRadius: "4px",
              width: matche ? "48px" : "54px",
              height: matche ? "48px" : "54px",
              color: "black",
            }}
            renderInput={(props: any) => <input {...props} />}
          />

          {formik.touched.code && Boolean(formik.errors.code) ? (
            <span> {formik.touched.code && formik.errors.code}</span>
          ) : null}
        </div>
        <button className="button-submit" type="submit">
          Continue
        </button>
        <p>
          *didn’t receive verificatin code ?{" "}
          <Link to="/forget-password">
            <span className="forget-password-redirect">Resend</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default OtpVerificationForm;
