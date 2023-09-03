import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
  const getUserName = localStorage.getItem("userName");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate('/Login')
  }
  return (
    <Row className="header">
      <Col xs={2} className="logo-wrp">
        <h2>Logo</h2>
      </Col>
      <Col xs={10} className="profile-wrp">
        <div className="profile-name text-capitalize">
          <DropdownButton className="text-capitalize" id="dropdown-basic-button" title={getUserName}>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
