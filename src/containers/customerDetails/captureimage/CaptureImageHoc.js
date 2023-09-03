import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { saveCustomerInfo } from "../Reducers/customerInfoSlice";
import { get } from "../../../Utils/apiFunctions";

const CaptureImageHoc = (Com, componentType) => {
  function InnerHoc() {
    const formData = useSelector((state) => state.formData.formData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [picture, setPicture] = useState(
      formData && formData.customerPic ? formData.customerPic : ""
    );
    const [isLoader, setIsloader] = useState(false);
    const [editError, setEditError] = useState(null);
    const [isToster, setIsToster] = useState(false);
    const webcamRef = React.useRef(null);
    const [isCaptureImageError, setIsCaptureImageError] = useState(false);

    useEffect(() => {
      formData && formData.customerPic && setPicture(formData.customerPic);
    }, [formData]);

    useEffect(() => {
      if (componentType === "editCaptureImage") {
        if (!location?.state?.nextButtonClicked && !location?.state?.prevButtonClicked) {
          getEditData();
        }
      }
    }, []);

    const getEditData = async () => {
      setIsloader(true);
      const getResponse = await get(
        `http://localhost:8081/getcustomerinfo?transactionId=${params.id}`
      );
      if (getResponse) {
        setIsloader(false);
      }
      if (getResponse.status === 200 && !getResponse.error) {
        setPicture(getResponse?.data?.customerPic);
        dispatch(saveCustomerInfo(getResponse?.data));
      } else {
        if (getResponse.status === 403) {
          navigate("/Unauthorized");
        } else {
          setEditError(getResponse);
          setIsToster(true);
        }
      }
    };

    const capture = React.useCallback(() => {
      setIsCaptureImageError(false);
      const pictureSrc = webcamRef.current.getScreenshot();
      setPicture(pictureSrc);
    });

    const handleNext = () => {
      if (picture === "") {
        setIsCaptureImageError(true);
      } else {
        let getFormData = { ...formData };
        getFormData.customerPic = picture;
        dispatch(saveCustomerInfo(getFormData));
        const goNextPath =
          componentType === "editCaptureImage"
            ? `/CustomerDetails/EditPreviewInformation/${params.id}`
            : "/CustomerDetails/PreviewInformation";
        navigate(goNextPath, {state:{
          nextButtonClicked:true
        }});
      }
    };

    const handlePrev = () => {
      const goBackPath =
        componentType === "editCaptureImage"
          ? `/CustomerDetails/EditCustomerInformation/${params.id}`
          : "/CustomerDetails";
      navigate(goBackPath, { state: { submited: true, prevButtonClicked:true } });
    };

    const closeToster = () => {
      setIsToster(false);
    };

    return (
      <Com
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
  }
  return InnerHoc;
};

export default CaptureImageHoc;
