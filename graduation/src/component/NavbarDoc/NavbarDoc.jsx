import React, { useState } from "react";
import "./NavbarDoc.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm,
} from "@coreui/react";
import profileImage from "../../assets/image/profile.png"; // Adjust the path to where your image is stored

const NavbarD = () => {
  const [visible, setVisible] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("//home");

  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName);
    setVisible(false); // Close the menu after clicking an item on small devices
  };

  return (
    <div id="color">
      <CNavbar
        expand="lg"
        colorScheme="light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 53.4% -80.8%, rgba(9, 29, 85, 1) 0.2%, rgba(0, 0, 0, 1) 100.2%)",
        }}
        className="fixed-top color"
      >
        <CContainer fluid>
          <CNavbarBrand className="text-white" href="/login">
            تسجيل الخروج
          </CNavbarBrand>
          <CNavbarBrand href="/">
            <OverlayTrigger
              key="right"
              placement="right"
              overlay={<Tooltip id="tooltip-right">الملف الشخصي</Tooltip>}
            >
              <img
                src={profileImage}
                alt="Profile"
                style={{ height: "30px" }}
              />
            </OverlayTrigger>
          </CNavbarBrand>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse items" visible={visible}>
            <CNavbarNav className="ms-auto">
              <CNavItem>
                <CNavLink
                  href="/doctor/statistics"
                  active={activeNavItem === "notes"}
                  onClick={() => handleNavItemClick("notes")}
                  className="text-white "
                >
                  احصائيات
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="/Doctor/Appointments"
                  active={activeNavItem === "health"}
                  onClick={() => handleNavItemClick("health")}
                  className="text-white"
                >
                  جدول المواعيد
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="/doctor/child"
                  active={activeNavItem === "health"}
                  onClick={() => handleNavItemClick("health")}
                  className="text-white"
                >
                  الاطفال
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="/doctor/home"
                  active={activeNavItem === "home"}
                  onClick={() => handleNavItemClick("home")}
                  className="text-white"
                >
                  الصفحة الرئيسية
                </CNavLink>
              </CNavItem>
            </CNavbarNav>
            <CForm className="d-flex"></CForm>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </div>
  );
};

export default NavbarD;
