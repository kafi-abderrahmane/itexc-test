import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  DashIcon,
  PatientsIcon,
  MsgIcon,
  AppointmentIcon,
  HistoryIcon,
} from "@/assets/svg/iconSideBar";

import "./sidebar.scss";

const SideBar: React.FC = ({}) => {
  const location = useLocation();

  const pathname = location?.pathname;

  return (
    <div className="sidebar-container">
      <Link to="/" className={`dash ${pathname === "/" && "dash-selected"}`}>
        <DashIcon />
        <span>Dashboard</span>
      </Link>
      <Link
        to="/patients"
        className={`patients ${
          pathname === "/patients" && "patients-selected"
        }`}>
        <PatientsIcon />
        <span>Patients list</span>
      </Link>
      <Link
        to="/messages"
        className={`messages ${
          pathname === "/messages" && "messages-selected"
        }`}>
        <MsgIcon />
        <span>Messages</span>
      </Link>
      <Link
        to="/appointment"
        className={`appointment ${
          pathname === "/appointment" && "appointment-selected"
        }`}>
        <AppointmentIcon />
        <span>Appointment</span>
      </Link>
      <Link
        to="/history"
        className={`history ${pathname === "/history" && "history-selected"}`}>
        <HistoryIcon />
        <span>Medical History</span>
      </Link>
    </div>
  );
};

export default SideBar;
