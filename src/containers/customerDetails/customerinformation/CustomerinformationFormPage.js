import React from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ButtonComponent from '../../../components/Button';

const CustomerInformationFormPage = (props) => {
  const {
    handleInputChange,
    renderInputBox,
    renderTextArea,
    renderSelect,
    renderFileUpload,
    customerInformationForm,
    handleNext,
  } = props;

  return (
    <Form className="mt-4" id="customerInformationForm">
      <Row>
        {customerInformationForm.map((item, index) => {
          switch (item.inputType) {
            case "textbox":
              return renderInputBox(item, index, handleInputChange);
            case "textarea":
              return renderTextArea(item, index, handleInputChange);
            case "select":
              return renderSelect(item, index, handleInputChange);
            case "fileupload":
              return renderFileUpload(item, index, handleInputChange);
            default:
              return;
          }
        })}
      </Row>
      <Row className="text-center justify-content-md-center">
        <ButtonComponent
          onClick={handleNext}
          className="w-25"
          id="customerInfoNextBtn"
          variant="primary mb-3"
          buttonName="Next"
        />
      </Row>
    </Form>
  );
};

export default CustomerInformationFormPage;
