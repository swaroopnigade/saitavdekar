import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import editCustomerInformationForm from "./editCustomerinformation.json";
import CustomerinformationHoc from "./CustomerinformationHoc";
import CustomerInformationFormPage from "./CustomerinformationFormPage";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCustomerInfo } from "../Reducers/customerInfoSlice";
import { get } from "../../../Utils/apiFunctions";
import PageLoder from "../../../components/PageLoder";
import Toaster from "../../../components/Toaster";

const EditCustomerInformation = (props) => {
  const params = useParams();
  const {
    handleInputChange,
    renderInputBox,
    renderTextArea,
    renderSelect,
    renderFileUpload,
    formData,
    handleFormValidaton,
    formErrorData,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [editData, setEditData] = useState(null);
  const [isLoader, setIsloader] = useState(false);
  const [editError, setEditError] = useState(null);
  const [isToster, setIsToster] = useState(false);

  useEffect(() => {
    if(!location?.state?.prevButtonClicked && !location?.state?.nextButtonClicked){
      getEditData(params.id);
    }
  }, []);

  const getEditData = async (id) => {
    setIsloader(true);
    const getResponse = await get(
      `http://localhost:8081/getcustomerinfo?transactionId=${id}`
    );
    //console.log("edit response === ", getResponse)
    if (getResponse) {
      setIsloader(false);
    }
    if (getResponse.status === 200 && !getResponse.error) {
      const tempData = {...getResponse.data}
      tempData.amountPaid = tempData.totalAmountPaid;
      setEditData(tempData);
      dispatch(saveCustomerInfo(tempData));
    } else {
      if (getResponse.status === 403) {
        navigate("/Unauthorized");
      } else {
        setEditError(getResponse);
        setIsToster(true);
      }
    }
  };

  const handleNext = () => {
    if (!handleFormValidaton()) {
      return;
    } else {
      dispatch(saveCustomerInfo(formData));
      navigate(`/CustomerDetails/EditCaptureImage/${params.id}`, {
        state: { nextButtonClicked:true},
      });
    }
  };

  const closeToster = () => {
    setIsToster(false);
  };

  console.log("editError ", editError);

  return (
    <>
      <Row className="justify-content-md-center position-relative customer-info-box">
        <Col xs lg="9" className="form-box mt-3">
          <h3 className="mt-3">Customer Information</h3>
          <CustomerInformationFormPage
            handleInputChange={handleInputChange}
            renderInputBox={renderInputBox}
            renderTextArea={renderTextArea}
            renderSelect={renderSelect}
            renderFileUpload={renderFileUpload}
            customerInformationForm={editCustomerInformationForm}
            handleNext={handleNext}
            formErrorData={formErrorData}
          />
        </Col>
        {isLoader ? <PageLoder /> : null}
      </Row>
      <Toaster
        apiResponseData={editError}
        isToster={isToster}
        closeToster={closeToster}
      />
    </>
  );
};

const EditCustomerInformationCom = CustomerinformationHoc(
  EditCustomerInformation
);

export default EditCustomerInformationCom;
