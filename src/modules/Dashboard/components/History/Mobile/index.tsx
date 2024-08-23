import React from "react";

import hideIcon from "@/assets/icon/Hide.svg";
import deleteIcon from "@/assets/icon/Delete.svg";

import SkeletonTable from "../../common/SkeletonTable";

import { AppointmentData } from "@/store/types";

import "./mobile.scss";
interface MobileHistotyProps {
  data: AppointmentData[] | undefined;
  error: any;
  isLoading: boolean;
  toggleDrawer: (id: string | null) => () => void;
}
const MobileHistoty: React.FC<MobileHistotyProps> = ({
  data,
  error,
  isLoading,
  toggleDrawer,
}) => {
  return (
    <div className="mobile-container">
      {isLoading ? (
        <div>
          <SkeletonTable />
        </div>
      ) : (
        <>
          <div className="cards">
            {data &&
              data?.map((item: AppointmentData) => (
                <div
                  key={item?.id}
                  onClick={toggleDrawer(item?.id)}
                  className="card-patient">
                  <div className="top-card">
                    <div className="patient">
                      <img
                        src={item?.patient?.image}
                        width={40}
                        height={40}
                        className="patient-img"
                        alt="logo profile"
                      />
                      <div className="fullname">
                        <p>{item?.patient?.fullname}</p>
                        <span>{item?.patient?.code}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        color:
                          status[item?.status?.toLocaleLowerCase()]?.color ||
                          "",
                        backgroundColor:
                          status[item?.status?.toLocaleLowerCase()]
                            ?.background || "",
                      }}
                      className={`status`}>
                      <span>{item?.status}</span>
                    </div>
                  </div>
                  <div className="item-card selected">
                    <p>Patient</p>
                    <p>{item?.appointment}</p>
                  </div>
                  <div className="item-card">
                    <p>Date</p>
                    <p>{item?.date}</p>
                  </div>
                  <div className="item-card">
                    <p>Time</p>
                    <p>{item?.time}</p>
                  </div>
                  <div className="item-card selected">
                    <p>Total</p>
                    <p>{item?.total}$</p>
                  </div>
                  <div className="item-card">
                    <p>Pay with</p>
                    <p>{item?.pay_with}</p>
                  </div>
                </div>
              ))}
          </div>

          {(!data || data?.length === 0) && (
            <div className="no-data">No History</div>
          )}
        </>
      )}
    </div>
  );
};

export default MobileHistoty;

const status: { [key: string]: { background: string; color: string } } = {
  success: { background: "#CFFCD4", color: "#479B36" },
  pending: { background: "#FFF7D0", color: "#8B601D" },
  cancled: { background: "#FFE4DB", color: "#981C19" },
};
