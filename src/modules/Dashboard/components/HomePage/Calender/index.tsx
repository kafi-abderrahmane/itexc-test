import React from "react";

import { Link } from "react-router-dom";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import "./calender.scss";

const Calender: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  console.log(value);
  return (
    <div className="calender">
      <div className="calender-top">
        <div className="title">
          <p>Calendar</p>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar", "DateCalendar"]}>
            <DateCalendar
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div className="upcoming">
          <div className="top">
            <div className="title-upcoming">
              <p>Upcoming</p>
            </div>
            <Link to="/appointment" className="view-all">
              <span>View All</span>
            </Link>
          </div>
          <button type="button" className="card">
            <div className="img-card">M</div>
            <div className="info-card">
              <p>Montly doctor’s meet</p>
              <span>8 April, 2021 | 04:00 PM</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calender;
