import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonComponent from "../../../components/Button";
import Webcam from "react-webcam";
import Image from "react-bootstrap/Image";
import PageLoder from "../../../components/PageLoder";
import Toaster from "../../../components/Toaster";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const CaptureImageForm = (props) => {
  const {
    picture,
    isCaptureImageError,
    capture,
    handleNext,
    handlePrev,
    webcamRef,
    setPicture,
    isLoader,
    isToster,
    editError,
    closeToster
  } = props;
  return (   
    <>
      <Row className="justify-content-md-center position-relative customer-info-box">
      <Col xs lg="9" className="form-box mt-5">
        <h3 className="mt-3">Capture Image</h3>
        <Form className="mt-4" id="customerInformationForm">
          <Row>
            {picture == "" ? (
              <Webcam
                audio={false}
                height={320}
                ref={webcamRef}
                width={320}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            ) : (
              <Col className="justify-content-md-center capture-img-box text-center">
                <Image crossorigin="anonymous" src={picture} thumbnail />
                {/* <img crossOrigin='anonymous' src={picture} /> */}
              </Col>
            )}
            {isCaptureImageError && (
              <div className="justify-content-md-center capture-img-box text-center form-error text-danger">
                Please Capture Image
              </div>
            )}
          </Row>
          <Row>
            <div className="text-center pt-3 pb-3">
              {picture != "" ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPicture("");
                  }}
                  className="btn btn-primary"
                >
                  Retake
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    capture();
                  }}
                  className="btn btn-danger"
                >
                  Capture
                </button>
              )}
            </div>
          </Row>
          <Row className="text-center justify-content-md-center mb-3">
            <ButtonComponent
              onClick={handlePrev}
              className="w-25"
              id="customerInfoNextBtn"
              variant="info"
              buttonName="Previous"
            />
            <ButtonComponent
              onClick={handleNext}
              className="w-25 ms-3"
              id="customerInfoNextBtn"
              variant="primary"
              buttonName="Next"
            />
          </Row>
        </Form>
      </Col>
      {isLoader ? <PageLoder/> : null}    
       
    </Row>
    <Toaster
    apiResponseData={editError}
    isToster={isToster}
    closeToster={closeToster}
  /> 
    </>
  );
};

export default CaptureImageForm;
