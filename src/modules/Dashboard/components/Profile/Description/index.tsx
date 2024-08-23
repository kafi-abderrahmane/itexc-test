import React from "react";

import { useNavigate } from "react-router-dom";

import locationIcon from "@/assets/icon/Location.svg";
import editIcon from "@/assets/icon/Edit.svg";

import coverP from "@/assets/images/cover.png";
import profileP from "@/assets/images/profile.png";
import "./description.scss";

const ProfileDescription: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-Description-display">
      <h1>Profile Description</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et aliqua. Ut enim ad minim veniam Lorem
        ipsum dolor sit amet, consectetur adipiscing elit, sed to : Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do e Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do e Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do e Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do e
      </p>
    </div>
  );
};

export default ProfileDescription;
