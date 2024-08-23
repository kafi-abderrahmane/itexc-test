import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useAuth } from "@/contexts/AuthProvider";
import { RootState } from "@/store";
import "./visitsthemouthgraph.scss";

const VisitsThisMouthGraph: React.FC = () => {
  const { profile } = useAuth();
  const user = useSelector((state: RootState) => state.user);
  const data2 = [
    { day: 1, visits: 30 },
    { day: 2, visits: 40 },
    { day: 3, visits: 50 },
    { day: 4, visits: 23 },
    { day: 5, visits: 32 },
    { day: 6, visits: 33 },
  ];
  const visitsArray = data2?.map((item) => item?.visits) || [];

  const daysArray = data2?.map((item) => item?.day) || [];
  return (
    <div className="visits">
      <div className="title-visits">
        <h1>Welcome back Dr. {profile?.fullname || user?.fullname}!</h1>
      </div>

      <div className="visits-chart">
        <p>Visits This month</p>
        <div className="chart">
          <ReactApexChart
            options={{
              chart: {
                id: "Mounth",
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  borderRadius: 8,
                },
              },
              xaxis: {
                type: "category",
                categories: daysArray,
              },
              yaxis: {
                show: true,
                tickAmount: 5,
                labels: {
                  formatter: function (value) {
                    return value + "";
                  },
                },
              },
              colors: ["#56CCF2", "#DFE8F6"],
              dataLabels: {
                enabled: false,
              },
            }}
            series={[
              {
                name: "Visites",
                data: visitsArray,
              },
            ]}
            type="bar"
            height={270}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitsThisMouthGraph;
