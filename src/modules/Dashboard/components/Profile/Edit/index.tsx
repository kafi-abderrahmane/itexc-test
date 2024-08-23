import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackBar } from "@/contexts/SnackBarProvider";
import { useAuth } from "@/contexts/AuthProvider";
import {
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from "@/store/apiSlice";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/store/apiSlice";

import TextField from "@/components/Textfield";
// import ModalEditMedia from "./ModalEditMedia";

import coverP from "@/assets/images/cover.png";
import profileP from "@/assets/images/profile.png";

//form
//validation
import * as Yup from "yup";
import { useFormik } from "formik";

import "./edit.scss";

interface ProfileFields {
  fullname: string;
  speciality: string;
  description: string;
  picture: string;
  cover: string;
}

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setSnack } = useSnackBar();
  const { user, profile } = useAuth();

  const [updateProfile, variableUpdate] = useUpdateProfileMutation();
  const [createProfile, variableCreate] = useCreateProfileMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [fields, setFields] = useState<ProfileFields>({
    fullname: "",
    speciality: "",
    description: "",
    cover: "",
    picture: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev: ProfileFields) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (profile && !fields?.fullname) {
      setFields(profile);
    }
  }, [profile]);

  const { isLoading, isSuccess, isError, error } = profile?.id
    ? variableUpdate
    : variableCreate;

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, "Fullname must be at least 3 characters long")
      .required("Fullname is required"),
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
      fullname: fields.fullname,
      speciality: fields.speciality,
      description: fields.description,
      cover: fields.cover,
      picture: fields.picture,
    },
    validationSchema,
    onSubmit: async (values: ProfileFields) => {
      try {
        const result = profile?.id
          ? await updateProfile({
              id: profile?.id || "",
              profileData: values,
            }).unwrap()
          : await createProfile({
              ...values,
              idfirebase: user?.uid || "",
            }).unwrap();

        dispatch(apiSlice.util.invalidateTags(["Profile"]));
        setSnack({
          open: true,
          type: "success",
          message: "edited",
        });
      } catch (err) {
        setSnack({
          open: true,
          type: "error",
          message: "error",
        });
      }
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
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setOpen(!open)}
            className="change-button">
            Change photo
          </button>
          <button type="button" disabled={isLoading} className="remove-button">
            Remove
          </button>
        </div>
      </div>
      <form
        className="profile-form"
        onSubmit={formik.handleSubmit}
        autoComplete="off">
        <TextField
          id="fullname"
          name="fullname"
          label="Full Name"
          type="text"
          disabled={isLoading}
          placeholder="Enter Your name here"
          value={fields?.fullname}
          onChange={handleChange}
          error={formik.touched.fullname && Boolean(formik.errors.fullname)}
          helperText={formik.touched.fullname && formik.errors.fullname}
        />
        <TextField
          id="speciality"
          name="speciality"
          label="Speciality"
          type="text"
          disabled={isLoading}
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
          disabled={isLoading}
          placeholder="Enter Your description here"
          rows={5}
          multiline
          value={fields?.description}
          onChange={handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&.Mui-focused fieldset": {
                borderColor: "#192252",
              },
            },
          }}
        />
        <div className="submit-buttons">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            disabled={isLoading}
            className="cancel-button">
            Cancel
          </button>
          <button
            type="submit"
            style={{ cursor: isLoading ? "wait" : "pointer" }}
            className="save-button"
            disabled={isLoading}>
            Save Changes
          </button>
        </div>
      </form>
      {/* <ModalEditMedia open={open} handleClose={() => setOpen(false)} /> */}
    </div>
  );
};

export default EditProfile;
