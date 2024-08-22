import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./mainlayout.scss";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="navbar-box">
        <NavBar />
      </div>
      <div className="dash-box">
        <div className="side-bar">sideBar</div>
        <div className="dash-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
