import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import fileIcon from "@/assets/icon/file.svg";
import downloadIcon from "@/assets/icon/Download.svg";

import Drawer from "@mui/material/Drawer";
import { useGetHistoryByIdQuery } from "@/store/apiSlice";

import "./drawerdetail.scss";

interface DrawerDetailProps {
  id: string | null;
  open: boolean;
  onClose: (newOpen: boolean) => void;
}
const DrawerDetail: React.FC<DrawerDetailProps> = ({ id, open, onClose }) => {
  const { data, error, isLoading } = useGetHistoryByIdQuery(id!, {
    skip: !id,
  });
  return (
    <Drawer
      open={open}
      onClose={onClose}
      className="drawer-patient"
      anchor="right">
      <div className="drawer-container">
        <div className="title-history">
          <h1>Medical History</h1>
          <button type="button" onClick={() => onClose(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className="patient-detail">
          <span className="title">Patient information</span>
          <div className="patient">
            <img
              src={data?.patient?.image}
              width={40}
              height={40}
              className="patient-img"
              alt="logo profile"
            />
            <div className="fullname">
              <p>{data?.patient?.fullname}</p>
              <span>Oran , es senia 310009</span>
            </div>
          </div>
        </div>
        <div className="patient-payment-detail">
          <span className="title">Payment Detail</span>
          <div className="grid-payment">
            <div className="item">
              <p>From</p>
              <span>{data?.pay_with}</span>
            </div>
            <div className="item">
              <p>Pay with</p>
              <span>Debit Card</span>
            </div>
            <div className="item">
              <p>Pay on</p>
              <span>Jan 12, 2023 At 09:00 aM</span>
            </div>
            <div className="item">
              <p>Statu payment</p>
              <div
                style={{
                  color:
                    status[data?.status?.toLocaleLowerCase() || ""]?.color ||
                    "",
                  backgroundColor:
                    status[data?.status?.toLocaleLowerCase() || ""]
                      ?.background || "",
                }}
                className={`status`}>
                <span>{data?.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="patient-invoice">
          <span className="title">INTIAL PAYMENT</span>
          <div className="grid-invoice">
            <p>Medical check-up</p>
            <span>$500</span>
            <p>Medicine</p>
            <span>$20</span>
            <div className="dash-border"></div>
            <div className="dash-border"></div>
            <p className="grand-total">Grandtotal</p>
            <span className="total">$520</span>
          </div>
        </div>
        <div className="patient-invoice-file">
          <span className="title">Documentation</span>
          <button type="button" className="file-box">
            <div className="file">
              <img
                src={fileIcon}
                width={24}
                height={24}
                alt="file logo"
                className="file-img"
              />
              <span>Medical-invoice.pdf</span>
            </div>
            <img
              src={downloadIcon}
              width={24}
              height={24}
              alt="download logo"
              className="download-img"
            />
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerDetail;

const status: { [key: string]: { background: string; color: string } } = {
  success: { background: "#CFFCD4", color: "#479B36" },
  pending: { background: "#FFF7D0", color: "#8B601D" },
  cancled: { background: "#FFE4DB", color: "#981C19" },
};
