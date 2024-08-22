import React from "react";

import { Link } from "react-router-dom";

import { LogoutIcon } from "@/assets/svg/iconDash";
import { ProfileIcon } from "@/assets/svg/iconDash";

import { useAuth } from "@/contexts/AuthProvider";

//mui
import { ClickAwayListener, Fade } from "@mui/material";

import "./dropdownprofile.scss";

interface DropDownProfileProps {
  children: React.ReactNode;
}

const DropDownProfile: React.FC<DropDownProfileProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);
  const { logout } = useAuth();
  return (
    <ClickAwayListener onClickAway={onClose}>
      <div className="dropdown-profile">
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
          }}
          className="dropdown-button">
          {children}
        </button>

        <Fade
          className={`dropdown-fade`}
          in={open}
          timeout={{ enter: 300, exit: 300 }}>
          <div>
            <div className="dropdown-container">
              <Link to="/profile" className="link-profile">
                <ProfileIcon />
                <span>Profile</span>
              </Link>
              <button
                title="Logout"
                type="button"
                onClick={logout}
                className="button-logout">
                <LogoutIcon />
                Logout
              </button>
            </div>
          </div>
        </Fade>
      </div>
    </ClickAwayListener>
  );
};

export default DropDownProfile;
