import React, { useState } from "react";
import {characterCheck, passwordCheck} from "../../../constants/validationConstants";

const useRegisterFormChange = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState({ ...initialData });
  const [formErrorData, setFormErrorData] = useState({ ...initialData });

  const handleChange = (e) => {
    const getFormData = { ...formData };
    getFormData[e.target.name] = e.target.value;
    setFormData(getFormData);
    const getFormErrorData = {...formErrorData};
    getFormErrorData[e.target.name] = "";
    setFormErrorData(getFormErrorData);
  };

  const handleValidation = () => {
    const getFormData = { ...formData };
    const getFormErrorData = {...formErrorData};
    if(getFormData.firstName === ""){
        getFormErrorData.firstName = "Please Enter First Name";
        setFormErrorData(getFormErrorData);
        return false
    }else if(!characterCheck.test(getFormData.firstName)){
        getFormErrorData.firstName = "Please Enter Valid First Name";
        setFormErrorData(getFormErrorData);
        return false
    }else if(getFormData.lastName === ""){
        getFormErrorData.lastName = "Please Enter Last Name";
        setFormErrorData(getFormErrorData);
        return false
    }else if(!characterCheck.test(getFormData.lastName)){
        getFormErrorData.lastName = "Please Enter Valid Last Name";
        setFormErrorData(getFormErrorData);
        return false
    }else if(getFormData.userName === ""){
        getFormErrorData.userName = "Please Enter User Name";
        setFormErrorData(getFormErrorData);
        return false
    }else if(getFormData.password === ""){
        getFormErrorData.password = "Please Enter Password";
        setFormErrorData(getFormErrorData);
        return false
    }else if(!passwordCheck.test(getFormData.password)){
        getFormErrorData.password = "Password contains atleast 1 Speacial Character 1 Number";
        setFormErrorData(getFormErrorData);
        return false
    }else if(getFormData.confirmPassword === ""){
        getFormErrorData.confirmPassword = "Password Not Match";
        setFormErrorData(getFormErrorData);
        return false
    }else if(getFormData.confirmPassword !== getFormData.password){
        getFormErrorData.confirmPassword = "Password Not Match";
        setFormErrorData(getFormErrorData);
        return false
    }else{
        return true
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
    formErrorData,
    handleValidation,
    resetForm
  }
};

export default useRegisterFormChange;
