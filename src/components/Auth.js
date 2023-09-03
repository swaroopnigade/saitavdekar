import React from "react";
import Input from "./Input";
import ButtonComponent from "./Button";
import Toaster from "./Toaster";
const Auth = (props) => {
  const {
    createFormData,
    formHeading,
    handleSubmit,
    formData,
    handleChange,
    buttonText,
    formErrorData,
    apiResponseData,
    isToster,
    closeToster,
    isLoader
  } = { ...props };
  const renderForm = () => {
    return createFormData.map((element, index) => {
      return (
        <Input
          name={element.name}
          id={element.id}
          label={element.label}
          className={element.className}
          value={formData[element.name]}
          onChange={handleChange}
          key={`${element.id}_${index}`}
          formErrorData={formErrorData}
          type={element.type}
        />
      );
    });
  };
  return (
    <div>
      <div className="center-v">
        <div className="auth-box">
          <h1 className="mb-4">{formHeading}</h1>
          <form>
            {renderForm()}
            <ButtonComponent
              onClick={handleSubmit}
              className="w-25 mt-2 position-relative"
              id="customerInfoNextBtn"
              variant="primary mb-3"
              buttonName={buttonText}
              isLoader={isLoader}
            />
          </form>
        </div>
      </div>
      <Toaster
        apiResponseData={apiResponseData}
        isToster={isToster}
        closeToster={closeToster}
      />
    </div>
  );
};

export default React.memo(Auth);
