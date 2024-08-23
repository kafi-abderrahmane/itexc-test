import React from "react";

import { Link } from "react-router-dom";

import logo from "@/assets/images/logo-healty.svg";
import setting from "@/assets/icon/Setting.svg";
import notif from "@/assets/icon/Notification.svg";
import avatar from "@/assets/images/Avatar.svg";
import drawer from "@/assets/icon/drawer-open.svg";

import Drawer from "@mui/material/Drawer";
import SideBar from "../SideBar";

import "./drawer.scss";

interface DrawerSideBarProps {
  open: boolean;
  onClose: (newOpen: boolean) => void;
}
const DrawerSideBar: React.FC<DrawerSideBarProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} className="drawer">
      <div className="drawer-container">
        <div className="drawer-top">
          <img src={drawer} alt="logo drawer" />
          <img
            src={logo}
            width={120}
            height={34}
            className="nav-logo"
            alt="logo"
          />
        </div>
        <div className="drawer-profile" onClick={() => onClose(false)}>
          <Link title="profile" to="/profile" className="link-profile">
            <img src={avatar} width={36} height={36} alt="logo profile" />
            <span>Edit My Profile</span>
          </Link>
          <button type="button" className="button-notif">
            <img src={notif} width={24} height={24} alt="logo notif" />
            <span>Notifications</span>
          </button>
          <button type="button" className="button-setting">
            <img src={setting} width={24} height={24} alt="logo setting" />
            <span>Settings</span>
          </button>
        </div>
        <div className="darwer-nav" onClick={() => onClose(false)}>
          <SideBar />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerSideBar;
