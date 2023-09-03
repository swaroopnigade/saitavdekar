import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { get } from "../../Utils/apiFunctions";
import { useNavigate } from "react-router-dom";
import Toaster from "../../components/Toaster";
import BoxLoader from "../../components/BoxLoader";

const Piechart = () => {
  const navigate = useNavigate();
  const [isLoader, setIsloader] = useState(false);
  const [isToster, setIsToster] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    getPieChardData();
  }, []);

  const getPieChardData = async () => {
    setIsloader(true);
    const getResponse = await get(`http://localhost:8081/pieChart`);
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

  const options = {
    pieSliceText: "label",
    pieStartAngle: 100,
    legend: {
      position: "right",
      textStyle: { color: "#0d6efd", fontSize: 16 },
      alignment: "top",
    },
    colors: ['#dc3545', '#198754']
  };

  const closeToster = () => {
    setIsToster(false);
  };
  return (
    <>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"350px"}
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

export default Piechart;
