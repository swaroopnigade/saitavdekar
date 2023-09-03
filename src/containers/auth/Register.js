import React, {useState}from "react";
import Auth from "../../components/Auth";
import registerForm from "./register.json";
import useRegisterFormChange from "./hook/useRegisterFormChange";
import {post} from "../../Utils/apiFunctions";


const Register = () => {
  const {formData, handleChange, handleValidation, formErrorData, resetForm} = useRegisterFormChange();
  const [isLoader, setIsloader] = useState(false);
  const [isToster, setIsToster] = useState(false);
  const [apiResponseData, setApiResponseData] = useState(null);

  const handleSubmit = () => {
    if(!handleValidation()){
     return 
    }else{
      setIsloader(true);
      const handleRegister = async () => {
        const postResponse = await post("http://localhost:8081/register", formData);
        if(postResponse.status !== 200 && postResponse.error){
          setIsToster(true);
          setApiResponseData(postResponse);
          setIsloader(false);
        }else{
          setIsToster(true);
          setApiResponseData(postResponse);
          setIsloader(false);
          resetForm();
        }
      }
      handleRegister();
    }
  };

  const closeToster = () => {
    setIsToster(false)
  }

  console.log("isLoader ", isLoader)
 
  return (
      <Auth
        handleChange={handleChange}
        formData={formData}
        createFormData={registerForm}
        formHeading="Register"
        handleSubmit={handleSubmit}
        buttonText="Register"
        formErrorData={formErrorData}
        apiResponseData={apiResponseData} isToster={isToster} closeToster={closeToster}
        isLoader={isLoader}
      />
  );
};

export default Register;
