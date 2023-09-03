import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Row>
      <Header />
      <div className="row content-box ps-0">
        <Col xs={6} md={2} className="sidebar-nav p-0 position-fixed">
          <Sidebar />
        </Col>
        <Col xs={10} className="info-box">
          <main>
            <Outlet />
          </main>
        </Col>
      </div>
    </Row>
  );
};

export default Dashboard;
