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
    useEffect(() => {
      if(!location.state || !location.state.submited){
        dispatch(saveCustomerInfo(null));
      }
      
    }, [])
    const editFormData = useSelector((state) => state.formData.formData);
    const dispatch = useDispatch();
    const { formData, handleInputChange, handleFormValidaton, formErrorData } =
      useFormChanges(editFormData);
    const { renderInputBox, renderTextArea, renderSelect, renderFileUpload, renderWeightBox } =
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
        renderWeightBox={renderWeightBox}
      />
    );
  }
  return InnerHoc;
};

export default CustomerinformationHoc;
