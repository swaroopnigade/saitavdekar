import React, { useEffect, useState } from "react";
import { get } from "../../Utils/apiFunctions";
import { useNavigate } from "react-router-dom";
import Toaster from "../../components/Toaster";
import BoxLoader from "../../components/BoxLoader";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = () => {
  const navigate = useNavigate();
  const [isLoader, setIsloader] = useState(false);
  const [isToster, setIsToster] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [data, setData] = useState(null);
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
      console.log("when api called ", getResponse.data)
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

  const closeToster = () => {
    setIsToster(false);
  };

  console.log("data ======== ", data)
  return (
    <>
      {data ? <Pie data={data}/> : null}
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
