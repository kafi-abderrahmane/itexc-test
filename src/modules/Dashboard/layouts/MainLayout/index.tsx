import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import "./mainlayout.scss";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="navbar-box">
        <NavBar />
      </div>
      <div className="dash-box">
        <div className="side-bar">
          <SideBar />
        </div>
        <div className="dash-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
