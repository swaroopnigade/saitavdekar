import React, { useState } from "react";
import PreviewInformationHoc from "./PreviewInformationHoc";
import PreviewInformationForm from "./PreviewInformationForm";

const PreviewInformation = (props) => {
  const {
    handleFinalSubmit,
    handlePrev,
    closeToster,
    formData,
    isLoader,
    isToster,
    apiResponseData,
    showButtons
  } = props;
  return (
    <PreviewInformationForm
      handleFinalSubmit={handleFinalSubmit}
      handlePrev={handlePrev}
      closeToster={closeToster}
      formData={formData}
      isLoader={isLoader}
      isToster={isToster}
      apiResponseData={apiResponseData}
      showButtons={showButtons}
    />
  );
};

const PreviewInformationComp = PreviewInformationHoc(PreviewInformation, "Preview");

export default PreviewInformationComp;
