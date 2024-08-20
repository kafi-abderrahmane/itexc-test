import React from "react";

import titleIcon from "@/assets/icon/emojiInfo.svg";
import testimonyImage from "@/assets/images/testimony.png";

import "./info.scss";

const LoginInfo: React.FC = () => {
  return (
    <div className="info">
      <div className="info-box">
        <div className="title-box">
          <h1>We give the best experience</h1>
          <img src={titleIcon} alt="sign up logo" />
        </div>
        <div className="description-box">
          <p>
            Dedicated virtual consulting platform for docotrs and patients to
            help them consult across vatious channels
          </p>
        </div>
        <div className="testimony">
          <div className="testimony-box">
            <img
              src={testimonyImage}
              width={410}
              height={143}
              className="testimony-first"
              alt="testimony 1"
            />
            <img
              src={testimonyImage}
              width={410}
              height={143}
              className="testimony-second"
              alt="testimony 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInfo;
