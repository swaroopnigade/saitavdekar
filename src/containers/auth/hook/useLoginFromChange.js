import React, {useState} from "react";
import {passwordCheck} from "../../../constants/validationConstants";

const useLoginFormChange = () => {
  const initialData = {
    userName: "",
    password: "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [formErrorData, setFormErrorData] = useState({ ...initialData });

  const handleChange = (e) => {
    const getFormData = { ...formData };
    getFormData[e.target.name] = e.target.value;
    setFormData(getFormData);
  };

  const validateLoginForm = () => {
    const getFormData = { ...formData };
    const getFormErrorData = {...formErrorData};
    if(getFormData.userName === ""){
        getFormErrorData.userName = "Please Enter Username";
        setFormErrorData(getFormErrorData);
        return false
    }else if(getFormData.password === ""){
        getFormErrorData.password = "Please Enter Password";
        setFormErrorData(getFormErrorData);
        return false
    }else if(!passwordCheck.test(getFormData.password)){
        getFormErrorData.password = "Please Enter Valid Password";
        setFormErrorData(getFormErrorData);
        return false
    }else{
        return true;
    }
  }

  const resetForm = () => {
    const getInitalData = {...initialData}
    setFormData(getInitalData);
    setFormErrorData(getInitalData);
  }

  return{
    formData,
    handleChange,
    validateLoginForm,
    formErrorData,
    resetForm
  }
};

export default useLoginFormChange;
