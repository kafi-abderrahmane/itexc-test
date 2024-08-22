import React from "react";

import logo from "@/assets/images/logo-healty.svg";
import setting from "@/assets/icon/Setting.svg";
import notif from "@/assets/icon/Notification.svg";
import avatar from "@/assets/images/Avatar.svg";
import drawer from "@/assets/icon/drawer.svg";

import DropDownProfile from "../DropDownProfile";
import Drawer from "../Drawer";

import "./navbar.scss";

const NavBar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <nav className="navbar">
        <img
          src={logo}
          width={196}
          height={55}
          className="nav-logo"
          alt="logo"
        />
        <button
          type="button"
          onClick={toggleDrawer(true)}
          className="button-drawer">
          <img src={drawer} width={32} height={28} alt="logo drawer" />
        </button>
        <p>Dashboard</p>
        <div className="nav-profile">
          <button type="button" className="button-notif">
            <img src={notif} width={24} height={24} alt="logo notif" />
          </button>
          <button type="button" className="button-setting">
            <img src={setting} width={24} height={24} alt="logo setting" />
          </button>
          <DropDownProfile>
            <div title="profile" className="img-profile">
              <img src={avatar} width={56} height={56} alt="logo profile" />
            </div>
          </DropDownProfile>
        </div>
      </nav>
      <Drawer open={open} onClose={toggleDrawer(false)} />
    </>
  );
};

export default NavBar;
