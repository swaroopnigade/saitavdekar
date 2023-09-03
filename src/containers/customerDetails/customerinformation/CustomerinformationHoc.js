import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import useFormRenderer from "./hooks/useFormRenderer";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormChanges from "./hooks/useFormChanges";
import { saveCustomerInfo } from "../Reducers/customerInfoSlice";

const CustomerinformationHoc = (Com) => {
  function InnerHoc() {
    const location = useLocation();
    console.log("location ", location)
    useEffect(() => {
      if(!location.state || !location.state.submited){
        dispatch(saveCustomerInfo(null));
      }
      
    }, [])
    const editFormData = useSelector((state) => state.formData.formData);
    const dispatch = useDispatch();
    const { formData, handleInputChange, handleFormValidaton, formErrorData } =
      useFormChanges(editFormData);
    const { renderInputBox, renderTextArea, renderSelect, renderFileUpload } =
      useFormRenderer({ formData, errorData: formErrorData });

    return (
      <Com
        handleInputChange={handleInputChange}
        renderInputBox={renderInputBox}
        renderTextArea={renderTextArea}
        renderSelect={renderSelect}
        renderFileUpload={renderFileUpload}
        formData={formData}
        handleFormValidaton={handleFormValidaton}
        formErrorData={formErrorData}
      />
      //     <Row className="justify-content-md-center">
      //     <Col xs lg="9" className='form-box mt-3'>
      //       <h3 className='mt-3'>Customer Information</h3>
      //     <Form className="mt-4" id="customerInformationForm">
      //       <Row>
      //         {formJson.map((item, index) => {
      //           switch (item.inputType) {
      //             case "textbox":
      //               return renderInputBox(item, index, handleInputChange);
      //             case "textarea":
      //               return renderTextArea(item, index, handleInputChange);
      //             case "select":
      //               return renderSelect(item, index, handleInputChange);
      //             case "fileupload":
      //               return renderFileUpload(item, index, handleInputChange);
      //             default:
      //               return;
      //           }
      //         })}
      //       </Row>
      //       <Row className="text-center justify-content-md-center">
      //         <ButtonComponent
      //           onClick={handleNext}
      //           className="w-25"
      //           id="customerInfoNextBtn"
      //           variant="primary mb-3"
      //           buttonName="Next"
      //         />
      //       </Row>
      //     </Form>

      //     </Col>
      // </Row>
    );
  }
  return InnerHoc;
};

export default CustomerinformationHoc;
