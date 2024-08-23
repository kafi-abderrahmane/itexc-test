import React from "react";

import TableHistoty from "../../components/History/Table";

import "./history.scss";

const HomePage: React.FC = () => {
  return (
    <div className="history-page">
      <div className="title-history">
        <h1>Medical History</h1>
      </div>
      <TableHistoty />
    </div>
  );
};

export default HomePage;
