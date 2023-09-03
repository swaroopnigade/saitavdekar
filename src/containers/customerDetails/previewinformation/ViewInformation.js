import React from 'react';
import PreviewInformationHoc from './PreviewInformationHoc';
import PreviewInformationForm from "./PreviewInformationForm";

const ViewInformation = (props) => {
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
  )
}

const ViewInformationComp = PreviewInformationHoc(ViewInformation, "View");

export default ViewInformationComp