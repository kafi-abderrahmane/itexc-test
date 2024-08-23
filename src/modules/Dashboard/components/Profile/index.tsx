import React from "react";

import { useNavigate } from "react-router-dom";

import locationIcon from "@/assets/icon/Location.svg";
import editIcon from "@/assets/icon/Edit.svg";

import coverP from "@/assets/images/cover.png";
import profileP from "@/assets/images/profile.png";
import "./profile.scss";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-display">
      <div className="cover-box">
        <img src={coverP} className="cover-img" width={1200} height={246} />
      </div>
      <div className="detail-box">
        <div className="box-img">
          <img
            src={profileP}
            width={146}
            height={146}
            className="profile-img"
          />
        </div>
        <div className="box-info">
          <div className="card-info">
            <h1>dr. Taylor gomez</h1>
            <p>Specialist of skin surgery in Moustafa bacha</p>
            <div className="address">
              <img
                src={locationIcon}
                className="location-Icon"
                alt="location Icon"
              />
              <span>Alger, Algeria</span>
            </div>
          </div>
          <div className="edit-box">
            <button onClick={() => navigate("/profile/edit")} type="button">
              <img src={editIcon} className="edit-Icon" alt="edit Icon" />
              <span>Edit profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
