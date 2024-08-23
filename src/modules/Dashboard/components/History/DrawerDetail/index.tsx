import React from "react";

import Drawer from "@mui/material/Drawer";

import "./drawerdetail.scss";

interface DrawerDetailProps {
  id: string | null;
  open: boolean;
  onClose: (newOpen: boolean) => void;
}
const DrawerDetail: React.FC<DrawerDetailProps> = ({ id, open, onClose }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      className="drawer-patient"
      anchor="right">
      <div className="drawer-container">sdsd</div>
    </Drawer>
  );
};

export default DrawerDetail;
