import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import "./Footer.css";

// Reusable SocialIcon component for displaying social media icons
const SocialIcon = ({ icon: Icon }) => (
  <Icon className="social-icon" size={30} />
);

const Footer1 = () => {
  return (
    <div className="footer">
      <div className="social-icons-container">
        <SocialIcon icon={FaFacebookSquare} />
        <SocialIcon icon={FaInstagram} />
        <SocialIcon icon={FaTwitterSquare} />
        <SocialIcon icon={FaDribbbleSquare} />
      </div>
      <div className="footer-text">
        <h1>جميع الحقوق &copy; محفوظة لوزارة الصحة الفلسطينية</h1>
      </div>
      <div className="footer-text">
        <h1>نسعى لتقديم العناية الفائقة لأطفالكم</h1>
      </div>
    </div>
  );
};

export default Footer1;
