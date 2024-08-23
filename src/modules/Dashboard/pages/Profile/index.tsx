import React from "react";

import Profile from "../../components/Profile";
import ProfileDescription from "../../components/Profile/Description";

import "./profile.scss";

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <Profile />
      <ProfileDescription />
    </div>
  );
};

export default ProfilePage;
