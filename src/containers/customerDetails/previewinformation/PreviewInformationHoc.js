import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { post, get, put } from "../../../Utils/apiFunctions";
import { saveCustomerInfo } from "../Reducers/customerInfoSlice";

const PreviewInformationHoc = (Com, compType) => {
  function InnerHoc() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoader, setIsloader] = useState(false);
    const [isToster, setIsToster] = useState(false);
    const [editError, setEditError] = useState(null);
    const [isPageLoder, setIsPageLoder] = useState(false);
    const [apiResponseData, setApiResponseData] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const formData = useSelector((state) => state.formData.formData);
    const params = useParams();
    
    useEffect(() => {
      if (compType === "EditPreview" || compType === "View") {
        if(!location?.state?.nextButtonClicked){
          getEditData();
        }
      }
      if(compType === "View"){
        setShowButtons(false)
      }else{
        setShowButtons(true)
      }
    }, []);

    const getEditData = async () => {
      setIsPageLoder(true);
      const getResponse = await get(
        `http://localhost:8081/getcustomerinfo?transactionId=${params.id}`
      );
      //console.log("edit response === ", getResponse)
      if (getResponse) {
        setIsPageLoder(false);
      }
      if (getResponse.status === 200 && !getResponse.error) {
        //console.log("getResponse.data.customerPic ", getResponse?.data?.customerPic)
        dispatch(saveCustomerInfo(getResponse?.data));
      } else {
        if (getResponse.status === 403) {
          navigate("/Unauthorized");
        } else {
          setApiResponseData(getResponse);
          setIsToster(true);
        }
      }
    };

    const handlePrev = () => {
      const prevPath =
        compType === "EditPreview"
          ? `/CustomerDetails/EditCaptureImage/${params.id}`
          : "/CustomerDetails/CaptureImage";
        
      navigate(prevPath, compType === "EditPreview" && {state:{prevButtonClicked:true}});
    };

    const handleFinalSubmit = () => {
      setIsloader(true);
      const getFormData = { ...formData }; // getFormData.fileUpload
      const data = new FormData();

      data.append("formData", JSON.stringify(getFormData));
      const handleRegister = async () => {
        let postResponse = null;
        if (compType === "EditPreview") {
          postResponse = await put(
            "http://localhost:8081/updateTransationDetails",
            data
          );
        } else {
          var fileData = dataURLtoFile(
            formData.customerPic,
            formData.firstName + formData.lastName
          );
          data.append("file", fileData);
          delete getFormData.fileUpload;
          delete getFormData.customerPic;
          postResponse = await post(
            "http://localhost:8081/insertTransationDetails",
            data
          );
        }
      
        if (postResponse.status !== 200 && postResponse.error) {
          setIsToster(true);
          setApiResponseData(postResponse);
          setIsloader(false);
        } else {
          setIsToster(true);
          setApiResponseData(postResponse);
          setIsloader(false);
          setTimeout(() => {
            navigateToDashboad();
          }, 3000);
        }
      };
      handleRegister();
    };

    const dataURLtoFile = (dataurl, filename) => {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename + ".jpg", { type: "'image/jpeg" });
    };

    const closeToster = () => {
      setIsToster(false);
      if (!apiResponseData.error && apiResponseData.status === 200) {
        navigateToDashboad();
      }
    };

    const navigateToDashboad = () => {
      if (compType === "EditPreview") {
        navigate("/Report");
      }else{
        navigate("/");
      }
      
      clearFormState();
    };

    const clearFormState = () => {
      dispatch(saveCustomerInfo(null));
    };
    return (
      <Com
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
  }
  return InnerHoc;
};

export default PreviewInformationHoc;
