import React, { useEffect, useState } from "react";
import { get } from "../../Utils/apiFunctions";
import { useNavigate } from "react-router-dom";
import Toaster from "../../components/Toaster";
import BoxLoader from "../../components/BoxLoader";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: ""
    }
  }
};

const Barchart = () => {
  const navigate = useNavigate();
  const [isLoader, setIsloader] = useState(false);
  const [isToster, setIsToster] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [data, setData] = useState(null);
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

  const closeToster = () => {
    setIsToster(false);
  };
  return (
    <>
      {data ? <Bar options={options} data={data} /> : null}
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
