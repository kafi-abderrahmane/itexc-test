import React from "react";

//components
import SignUpForm from "../../components/signUp/form";
import Info from "../../components/info";

import "./signup.scss";

const SignUpPage: React.FC = () => {
  return (
    <div className="signup">
      <main>
        <SignUpForm />
        <Info />
      </main>
    </div>
  );
};

export default SignUpPage;
