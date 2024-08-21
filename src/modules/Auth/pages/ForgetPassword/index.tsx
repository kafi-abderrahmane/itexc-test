import React from "react";

//components
import ForgetPasswordForm from "../../components/forgetPassword/form";
import Info from "../../components/info";

import "./forgetPassword.scss";

const ForgetPasswordPage: React.FC = () => {
  return (
    <div className="forget-password">
      <main>
        <ForgetPasswordForm />
        <Info />
      </main>
    </div>
  );
};

export default ForgetPasswordPage;
