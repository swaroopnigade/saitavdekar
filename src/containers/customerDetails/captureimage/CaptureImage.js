import React from "react";
import CaptureImageHoc from "./CaptureImageHoc";
import CaptureImageForm from "./CaptureImageForm";

const CaptureImage = (props) => {
  const {
    picture,
    isCaptureImageError,
    capture,
    handleNext,
    handlePrev,
    webcamRef,
    setPicture,
    isLoader,
    isToster,
    editError,
    closeToster,
  } = props;
  return (
    <CaptureImageForm
      picture={picture}
      isCaptureImageError={isCaptureImageError}
      capture={capture}
      handleNext={handleNext}
      handlePrev={handlePrev}
      webcamRef={webcamRef}
      setPicture={setPicture}
      isLoader={isLoader}
      isToster={isToster}
      editError={editError}
      closeToster={closeToster}

    />
  );
};

const CaptureImageComp = CaptureImageHoc(CaptureImage, "captureImage");

export default React.memo(CaptureImageComp);
