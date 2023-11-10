import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import React, { useState } from "react";
import logo from "../assets/math'slady.png";
import { FaAward } from "react-icons/fa";
import { Badge } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { FcMindMap } from "react-icons/fc";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function Navbar() {
  const [postionOfNav, setPostionOfNav] = useState(false);
  function handleNavbarPosition() {
    setPostionOfNav(!postionOfNav);
  }

  return (
    <div className="navbar">
      <div className="logo">
        <div className="imgLogo">
          <img src={logo} alt="" />
          <strong>myFavourite Teacher</strong>
        </div>
      </div>
      <div className="mid-options" onClick={handleNavbarPosition}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <SettingsOutlinedIcon
            className={postionOfNav ? "setting1" : "setting2"}
          />
          services
        </div>
      </div>
      <div
        className={`middle-options ${postionOfNav ? "newPositionOFnav" : ""}`}
      >
        <div className="icons">
          <div className="icons-box">
            <DashboardOutlinedIcon className="middle-icons" />
            Dashboard
          </div>
          <div className="icons-box">
            <MenuBookIcon className="middle-icons" />
            Course
          </div>
          <div className="icons-box">
            <FcMindMap className="middle-icons" />
            Learning Lab
          </div>
          <div className="icons-box">
            <FaAward className="middle-icons" />
            Achievements
          </div>
        </div>
      </div>

      <div className="profile-right-side">
        <div>
          <div className="right-icons">
            <div>
              <Badge badgeContent={4} color="error">
                <CircleNotificationsIcon className="rightSideicons" />
              </Badge>
            </div>
            <div>
              <AccountCircleOutlinedIcon className="rightSideicons" />
              <KeyboardArrowDownOutlinedIcon className="rightSideicons" />
            </div>
          </div>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
