import React from "react";

import titleIcon from "@/assets/icon/signupIcon.svg";

import VisitsThisMouthGraph from "../../components/HomePage/VisitsThisMouthGraph";
import Calender from "../../components/HomePage/Calender";
import TableHistoty from "../../components/History/Table";

import { useSelector } from "react-redux";
import { useAuth } from "@/contexts/AuthProvider";
import { RootState } from "@/store";

import "./homepage.scss";

const HomePage: React.FC = () => {
  const { profile } = useAuth();
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="home-page">
      <div className="home-top">
        <div className="chart-box">
          <VisitsThisMouthGraph />
        </div>
        <div className="calender-appointment">
          <div className="title-box">
            <h1>Welcome back Dr. {profile?.fullname || user?.fullname}!</h1>
            <img src={titleIcon} alt="sign up logo" className="title-img" />
          </div>
          <div className="calender-box">
            <Calender />
          </div>
        </div>
      </div>
      <div className="home-history">
        <div className="title">
          <p>Medical History</p>
        </div>
        <TableHistoty />
      </div>
    </div>
  );
};

export default HomePage;
