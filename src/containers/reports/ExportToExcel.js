import React, { useState } from "react";
import * as FileSaver from 'file-saver';
import XLSX from "sheetjs-style";
import { FileEarmarkSpreadsheetFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { get } from "../../Utils/apiFunctions";

const ExportToExcelComp = (props) => {
  const { reportType, compName, excelDownloadUrl } = props;
  const navigate = useNavigate();
  const [reportError, setReportError] = useState(null);
  const [isLoader, setIsloader] = useState(false);
  const [isToster, setIsToster] = useState(false);
  
  const handleDownloadExcel = () => {
    getCustomRepotsData(excelDownloadUrl);
  };

  const getCustomRepotsData = async (url) => {
    setIsloader(true);
    const getResponse = await get(url);
    if (getResponse) {
      setIsloader(false);
    }
    if (getResponse.status === 200 && !getResponse.error) {
      exportToExcel(getResponse.data.transactionData)
    } else {
      if (getResponse.status === 403) {
        navigate("/Unauthorized");
      } else {
        setReportError(getResponse);
        setIsToster(true);
      }
    }
  };

  const exportToExcel = async(data) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets:{'data':ws}, SheetNames:['data']};
    const excelBuffer = XLSX.write(wb, {bookType:'xlsx', type:"array"});
    const datas = new Blob([excelBuffer], {type:fileType});
    FileSaver.saveAs(datas, "testing"+fileExtension)
  }

  return (
    <div>
      <button onClick={handleDownloadExcel} type="button" class="btn btn-light">
        <FileEarmarkSpreadsheetFill />
      </button>
    </div>
  );
};

export default ExportToExcelComp;
