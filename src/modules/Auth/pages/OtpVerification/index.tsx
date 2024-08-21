import React from "react";

//components
import OtpVerificationForm from "../../components/otpVerification/form";
import Info from "../../components/info";

import "./otpVerification.scss";

const OtpVerificationPage: React.FC = () => {
  return (
    <div className="forget-password">
      <main>
        <OtpVerificationForm />
        <Info />
      </main>
    </div>
  );
};

export default OtpVerificationPage;
