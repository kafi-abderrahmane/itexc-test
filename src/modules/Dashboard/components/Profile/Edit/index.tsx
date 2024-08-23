import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackBar } from "@/contexts/SnackBarProvider";

import TextField from "@/components/Textfield";

import coverP from "@/assets/images/cover.png";
import profileP from "@/assets/images/profile.png";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import "./edit.scss";

interface fieldsEdit {
  fullName: string;
  speciality: string;
  description: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { setSnack } = useSnackBar();
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<fieldsEdit>({
    fullName: "",
    speciality: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev: fieldsEdit) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "FullName must be at least 3 characters long")
      .required("FullName is required"),
    speciality: Yup.string()
      .min(3, "speciality must be at least 3 characters long")
      .required("speciality is required"),
    description: Yup.string()
      .min(3, "description must be at least 3 characters long")
      .required("description is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: fields.fullName,
      speciality: fields.speciality,
      description: fields.description,
    },
    validationSchema,
    onSubmit: async (values: fieldsEdit) => {
      setLoading(true);

      setSnack({
        open: true,
        type: "success",
        message: "edited",
      });
      setLoading(false);
    },
  });
  return (
    <div className="edit-profile-display">
      <div className="title-edit">
        <h1>Edit profile</h1>
        <p>
          Your profile will be displayed publicly so be careful what you share
        </p>
      </div>

      <div className="cover-box-edit">
        <span>Cover</span>
        <img src={coverP} className="cover-img" />
      </div>
      <div className="profile-picture-box">
        <span>Profile picture</span>
        <div className="box-profile">
          <img src={profileP} width={56} height={56} className="profile-img" />
          <button type="button" className="change-button">
            Change photo
          </button>
          <button type="button" className="remove-button">
            Remove
          </button>
        </div>
      </div>
      <form
        className="profile-form"
        onSubmit={formik.handleSubmit}
        autoComplete="off">
        <TextField
          id="fullName"
          name="fullName"
          label="Full Name"
          type="text"
          disabled={loading}
          placeholder="Enter Your name here"
          value={fields?.fullName}
          onChange={handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          id="speciality"
          name="speciality"
          label="Speciality"
          type="text"
          disabled={loading}
          placeholder="Enter Your speciality here"
          value={fields?.speciality}
          onChange={handleChange}
          error={formik.touched.speciality && Boolean(formik.errors.speciality)}
          helperText={formik.touched.speciality && formik.errors.speciality}
        />
        <TextField
          id="description"
          name="description"
          label="Profile Desciption"
          type="text"
          disabled={loading}
          placeholder="Enter Your description here"
          value={fields?.description}
          onChange={handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <div className="submit-buttons">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
