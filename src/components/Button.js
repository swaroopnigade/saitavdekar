import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ButtonComponent = (props) => {
  const { id, className, variant, buttonName, onClick, isLoader } = {
    ...props,
  };
  
  return (
    <Button id={id} className={className} variant={variant} onClick={onClick} disabled={isLoader}>
      {buttonName}
      {
        isLoader ? <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="btn-spinner"
      /> : null
      }
      
    </Button>
  );
};

export default React.memo(ButtonComponent);
