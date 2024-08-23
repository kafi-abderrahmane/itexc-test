import React from "react";

import hideIcon from "@/assets/icon/Hide.svg";
import deleteIcon from "@/assets/icon/Delete.svg";

import SkeletonTable from "../../common/SkeletonTable";
import DrawerDetail from "../DrawerDetail";
import MobileHistoty from "../Mobile";
import { Pagination } from "@mui/material";

import { useGetHistoryQuery } from "@/store/apiSlice";

import { AppointmentData } from "@/store/types";

import "./table.scss";

const TableHistoty: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [id, setId] = React.useState<string | null>(null);
  const { data, error, isLoading } = useGetHistoryQuery({
    page: currentPage,
    limit: 10,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const toggleDrawer = (id: string | null) => () => {
    setId(id);
  };
  return (
    <>
      <div className="table-histoty">
        <div className="table-container">
          {isLoading ? (
            <div>
              <SkeletonTable />
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th className="double-th">Appointment</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th className="half-th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.map((item: AppointmentData) => (
                      <tr
                        key={item?.id}
                        onClick={toggleDrawer(item?.id)}
                        className="cell-table">
                        <td className="">
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
                        </td>
                        <td className="double-td">{item?.appointment}</td>
                        <td className="">{item?.date}</td>
                        <td className="">{item?.time}</td>
                        <td className="">
                          <div
                            style={{
                              color:
                                status[item?.status?.toLocaleLowerCase()]
                                  ?.color || "",
                              backgroundColor:
                                status[item?.status?.toLocaleLowerCase()]
                                  ?.background || "",
                            }}
                            className={`status`}>
                            <span>{item?.status}</span>
                          </div>
                        </td>
                        <td className="half-td action">
                          <button
                            title="hide"
                            type="button"
                            className="action-button">
                            <img src={hideIcon} alt="hide icon" />
                          </button>
                          <button
                            title="delete"
                            type="button"
                            className="action-button">
                            <img src={deleteIcon} alt="delete icon" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {(!data || data?.length === 0) && (
                <div className="no-data">No History</div>
              )}
            </>
          )}
        </div>

        <div className="mobile-box">
          <MobileHistoty
            data={data}
            error={error}
            isLoading={isLoading}
            toggleDrawer={toggleDrawer}
          />
        </div>
        <div className="pagination">
          <Pagination count={1} page={currentPage} onChange={handleChange} />
        </div>
      </div>
      <DrawerDetail
        id={id}
        open={id ? true : false}
        onClose={toggleDrawer(null)}
      />
    </>
  );
};

export default TableHistoty;

const status: { [key: string]: { background: string; color: string } } = {
  success: { background: "#CFFCD4", color: "#479B36" },
  pending: { background: "#FFF7D0", color: "#8B601D" },
  cancled: { background: "#FFE4DB", color: "#981C19" },
};
