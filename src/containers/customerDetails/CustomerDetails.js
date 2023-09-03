import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet, useLocation, useParams} from "react-router-dom";

const CustomerDetails = () => {
  const location = useLocation();
  const activeUrl = location.pathname;
  return (
    <div>
      <Row>
        <Col xs={12} md={12}>
          <Row className="justify-content-md-center home-submenu">
            <Col
              xs
              lg="2"
              className={`text-center home-submenu-item ${
                activeUrl && activeUrl === "/CustomerDetails" || activeUrl.includes("EditCustomerInformation") ? "current-step" : null
              }`}
            >
              Customer Information
            </Col>
            <Col
              xs
              lg="2"
              className={`text-center home-submenu-item ${
                activeUrl && activeUrl === "/CustomerDetails/CaptureImage" || activeUrl.includes("EditCaptureImage")
                  ? "current-step"
                  : null
              }`}
            >
              Capture Image
            </Col>
            <Col
              xs
              lg="2"
              className={`text-center home-submenu-item ${
                activeUrl && activeUrl === "/CustomerDetails/PreviewInformation" || activeUrl.includes("EditPreviewInformation") || activeUrl.includes("ViewInformation")
                  ? "current-step"
                  : null
              }`}
            >
              Preview Information
            </Col>
          </Row>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default CustomerDetails;
