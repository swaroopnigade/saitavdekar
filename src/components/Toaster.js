import React from "react";
import Toast from "react-bootstrap/Toast";

const Toaster = (props) => {
  const { apiResponseData, isToster, closeToster } = { ...props };
  return (
    <Toast
      className={apiResponseData && apiResponseData.error ? "bg-danger" : "bg-success"}
      onClose={() => closeToster()}
      show={isToster}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">
          {apiResponseData && apiResponseData.error ? "Error" : "Success"}
        </strong>
      </Toast.Header>
      <Toast.Body className={"text-white"}>
        {apiResponseData && apiResponseData.message}
      </Toast.Body>
    </Toast>
  );
};

export default React.memo(Toaster);
