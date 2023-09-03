import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import customerInformationForm from "./customerinformation.json";
import CustomerinformationHoc from "./CustomerinformationHoc";
import CustomerInformationForm from "./CustomerinformationFormPage";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCustomerInfo } from "../Reducers/customerInfoSlice";

const Customerinformation = (props) => {
  const {
    handleInputChange,
    renderInputBox,
    renderTextArea,
    renderSelect,
    renderFileUpload,
    formData,
    handleFormValidaton,
    formErrorData,
    renderWeightBox
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNext = () => {
    if (!handleFormValidaton()) {
      return;
    } else {
      dispatch(saveCustomerInfo(formData));
      navigate("/CustomerDetails/CaptureImage", {state:{prevPath:location.pathname}});
    }
  };

  return (
    <Row className="justify-content-md-center customer-info-box">
      <Col xs lg="9" className="form-box mt-3">
        <h3 className="mt-3">Customer Information</h3>
        <CustomerInformationForm
          handleInputChange={handleInputChange}
          renderInputBox={renderInputBox}
          renderTextArea={renderTextArea}
          renderSelect={renderSelect}
          renderFileUpload={renderFileUpload}
          customerInformationForm={customerInformationForm}
          handleNext={handleNext}
          formErrorData={formErrorData}
          renderWeightBox={renderWeightBox}
        />
      </Col>
    </Row>
  );
};

const CustomerinformationCom = CustomerinformationHoc(Customerinformation, "editInfo");

export default CustomerinformationCom;
