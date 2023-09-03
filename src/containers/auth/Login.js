import React, { useState } from "react";
import Auth from "../../components/Auth";
import loginForm from "./login.json";
import useLoginFormChange from "./hook/useLoginFromChange";
import { post } from "../../Utils/apiFunctions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    formData,
    handleChange,
    validateLoginForm,
    formErrorData,
    resetForm,
  } = useLoginFormChange();
  const [isLoader, setIsloader] = useState(false);
  const [isToster, setIsToster] = useState(false);
  const [apiResponseData, setApiResponseData] = useState(null);

  const closeToster = () => {
    setIsToster(false);
  };

  const handleSubmit = () => {
    //const getFormData = { ...formData };
    console.log("validateLoginForm ", validateLoginForm());
    if (!validateLoginForm()) {
      return;
    } else {
      setIsloader(true);
      const handleRegister = async () => {
        const postResponse = await post(
          "http://localhost:8081/login",
          formData
        );
        if (postResponse) {
          setIsToster(true);
          setApiResponseData(postResponse);
          setIsloader(false);
          if (postResponse.status === 200 && !postResponse.error) {
            resetForm();
            localStorage.setItem("token", postResponse.data.token);
            localStorage.setItem(
              "userName",
              postResponse.data.firstName + " " + postResponse.data.lastName
            );
            navigate("/");
          }
        }
      };
      handleRegister();
    }
  };

  return (
    <Auth
      handleChange={handleChange}
      formData={formData}
      createFormData={loginForm}
      formHeading="Login"
      handleSubmit={handleSubmit}
      buttonText="Login"
      formErrorData={formErrorData}
      apiResponseData={apiResponseData}
      isToster={isToster}
      closeToster={closeToster}
      isLoader={isLoader}
    />
  );
};

export default Login;
