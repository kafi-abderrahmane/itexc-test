import React from "react";

//components
import LoginForm from "../../components/login/form";
import Info from "../../components/info";

import "./login.scss";

const LoginPage: React.FC = () => {
  return (
    <div className="login">
      <main>
        <LoginForm />
        <Info />
      </main>
    </div>
  );
};

export default LoginPage;
