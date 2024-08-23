import React from "react";

import { useAuth } from "@/contexts/AuthProvider";

import "./description.scss";

const ProfileDescription: React.FC = () => {
  const { profile } = useAuth();

  return (
    <div className="profile-Description-display">
      <h1>Profile Description</h1>
      <p>{profile?.description}</p>
    </div>
  );
};

export default ProfileDescription;
