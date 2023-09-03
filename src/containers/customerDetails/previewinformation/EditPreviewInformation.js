import React, { useState } from "react";
import PreviewInformationHoc from "./PreviewInformationHoc";
import PreviewInformationForm from "./PreviewInformationForm";

const EditPreviewInformation = (props) => {
  const {
    handleFinalSubmit,
    handlePrev,
    closeToster,
    formData,
    isLoader,
    isToster,
    apiResponseData,
    isPageLoder,
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
      isPageLoder={isPageLoder}
      showButtons={showButtons}
    />
  );
};

const EditPreviewInformationComp = PreviewInformationHoc(EditPreviewInformation, "EditPreview");

export default EditPreviewInformationComp;
