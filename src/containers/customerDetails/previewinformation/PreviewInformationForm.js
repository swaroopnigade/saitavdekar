import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import ButtonComponent from "../../../components/Button";
import Toaster from "../../../components/Toaster";
import PageLoder from "../../../components/PageLoder";

const PreviewInformationForm = (props) => {
  const {
    handleFinalSubmit,
    handlePrev,
    closeToster,
    formData,
    isLoader,
    isToster,
    apiResponseData,
    isPageLoder,
    showButtons
  } = props;
  console.log("xxxxx ===== ", showButtons)
  return (
    <>
      <Row className="justify-content-md-center position-relative customer-info-box">
        <Col xs lg="12" className="mt-5">
          <Row>
            <Col xs={6} md={8}>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>First Name:</td>
                    <td>{formData?.firstName}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>{formData?.lastName}</td>
                  </tr>
                  <tr>
                    <td>Email Id:</td>
                    <td>{formData?.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile No:</td>
                    <td>{formData?.mobileNo}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth:</td>
                    <td>{formData?.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{formData?.address}</td>
                  </tr>
                  <tr>
                    <td>Amount:</td>
                    <td>{formData?.amount}</td>
                  </tr>
                  <tr>
                    <td>Amount Paid:</td>
                    <td>{formData?.amountPaid}</td>
                  </tr>
                  <tr>
                    <td>Pending Amount:</td>
                    <td>{formData?.amountPending}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={6} md={4}>
              <Image crossorigin="anonymous" src={formData?.customerPic} thumbnail />
            </Col>
          </Row>
          {
              showButtons ? <Row className="text-center justify-content-md-center mb-3">
            
              <ButtonComponent
                onClick={handlePrev}
                className="w-25"
                id="customerInfoNextBtn"
                variant="info"
                buttonName="Previous"
              />
              <ButtonComponent
                onClick={handleFinalSubmit}
                className="w-25 ms-3 position-relative"
                id="customerInfoNextBtn"
                variant="primary"
                buttonName="Submit"
                isLoader={isLoader}
              />
            </Row> : null
          }
          
        </Col>
        {isPageLoder ? <PageLoder/> : null}
      </Row>
      <Toaster
        apiResponseData={apiResponseData}
        isToster={isToster}
        closeToster={closeToster}
      />
      
    </>
  );
};

export default PreviewInformationForm;