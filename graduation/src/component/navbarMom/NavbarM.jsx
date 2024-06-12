import React, { useState } from "react";
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from "@coreui/react";
// Import your image
import profileImage from "../../assets/image/profile.png"; // Adjust the path to where your image is stored
import "./NavbarM.css";

const NavbarM = () => {
  const [visible, setVisible] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("/mother/home");

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
          <CNavbarBrand href="/mother/profile">
            <OverlayTrigger
              key="right"
              placement="right"
              overlay={<Tooltip id="tooltip-right">الملف الشخصي </Tooltip>}
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
            <CNavbarNav className="ms-auto ·">
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary right" className="text-white">
                  ادارة الموعيد
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    href="/Mother/ViewApp"
                    onClick={() => handleNavItemClick("action1")}
                  >
                    ادارة ومشاهدة المواعيد
                  </CDropdownItem>

                  <CDropdownDivider />
                  <CDropdownItem
                    href="/mother/Appointment"
                    onClick={() => handleNavItemClick("other")}
                  >
                    حجز موعد جديد
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CNavItem>
                <CNavLink
                  href="/mother/MotherChildCard"
                  active={activeNavItem === "health"}
                  onClick={() => handleNavItemClick("health")}
                  className="text-white"
                >
                  الوضع الصحي للطفل
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="/mother/home"
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

export default NavbarM;
