import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { get } from "../../Utils/apiFunctions";
import { useNavigate } from "react-router-dom";
import Toaster from "../../components/Toaster";
import BoxLoader from "../../components/BoxLoader";

const Barchart = () => {
  const navigate = useNavigate();
  const [isLoader, setIsloader] = useState(false);
  const [isToster, setIsToster] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    getBarChardData();
  }, []);

  const getBarChardData = async () => {
    setIsloader(true);
    const getResponse = await get(`http://localhost:8081/barChart`);
    if (getResponse) {
      setIsloader(false);
    }
    if (getResponse.status === 200 && !getResponse.error) {
      setData(getResponse.data);
    } else {
      if (getResponse.status === 403) {
        navigate("/Unauthorized");
      } else {
        setErrorData(getResponse);
        setIsToster(true);
      }
    }
  };

  const baroptions = {
    legend: {
      position: "bottom",
      textStyle: { color: "#0d6efd", fontSize: 16 },
      alignment: "start",
    },
    height: 350,
    colors: ['#0d6efd','#198754','#dc3545']
  };

  const closeToster = () => {
    setIsToster(false);
  };
  return (
    <>
      <Chart
        chartType="Bar"
        width="100%"
        height="250px"
        data={data}
        options={baroptions}
      />
      {isLoader ? <BoxLoader /> : null}
      <Toaster
        apiResponseData={errorData}
        isToster={isToster}
        closeToster={closeToster}
      />
    </>
  );
};

export default Barchart;
