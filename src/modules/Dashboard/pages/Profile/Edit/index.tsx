import React from "react";
import EditProfile from "@/modules/Dashboard/components/Profile/Edit";
import "./edit.scss";

const EditProfilePage: React.FC = () => {
  return (
    <div className="edit-profile-page">
      <EditProfile />
    </div>
  );
};

export default EditProfilePage;
