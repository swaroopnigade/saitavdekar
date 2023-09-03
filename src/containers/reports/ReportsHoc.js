import React, { useState, useEffect, useTransition } from "react";
import { get } from "../../Utils/apiFunctions";
import { EyeFill, PencilFill, ClockHistory } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { parseISO, format } from "date-fns";
import ButtonComponent from "../../components/Button";
import Input from "../../components/Input";
import FilterComponent from "../../components/FilterComponent";
import ExportToExcelComp from "./ExportToExcel"

const ReportsHoc = (Comp, compName) => {
  function InnerCom() {
    const navigate = useNavigate();
    const params = useParams();
    const [reportData, setReportData] = useState([]);
    const [reportDataCount, setReportDataCount] = useState(0);
    const [reportError, setReportError] = useState(null);
    const [isLoader, setIsloader] = useState(false);
    const [limit, setLimit] = useState(10);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [isToster, setIsToster] = useState(false);
    const [reportType, setReportType] = useState("default");
    const [isCustomReport, setIsCustomReport] = useState(false);
    const [customDate, setCustomDate] = useState({});
    const [isPending, startTransition] = useTransition();
    const [selected, setSelected] = useState([]);
    const [nameSearchData, setNameSearchData] = useState([]);

    const filteredItems = reportData?.filter(
      (item) =>
        item.firstName &&
        item.firstName.toLowerCase().includes(filterText.toLowerCase())
    );

    const getDailyReport = (page, pageLimit) => {
      setReportType("daily");
      setIsCustomReport(false);
      //setLimit(10)
      getCustomRepotsData(
        `http://localhost:8081/dailyReport?page=${page}&&limit=${pageLimit}&&filter=${compName}`
      );
    };

    const getWeeklyReport = (page, pageLimit) => {
      setReportType("weekly");
      setIsCustomReport(false);
      getCustomRepotsData(
        `http://localhost:8081/weeklyReport?page=${page}&&limit=${pageLimit}&&filter=${compName}`
      );
    };

    const getMonthlyReport = (page, pageLimit) => {
      setReportType("monthly");
      setIsCustomReport(false);
      getCustomRepotsData(
        `http://localhost:8081/monthlyReport?page=${page}&&limit=${pageLimit}&&filter=${compName}`
      );
    };

    const toggleCustomReportFidlds = (status) => {
      setIsCustomReport(!status);
    };

    const hanldeCustomReportDateChange = (event) => {
      const getcustomDate = { ...customDate };
      getcustomDate[event.target.name] = event.target.value;
      setCustomDate(getcustomDate);
    };

    const getCustomFilterData = (page, pageLimit) => {
      setReportType("custom");
      getCustomRepotsData(
        `http://localhost:8081/customReport?fromDate=${customDate.fromDate}&&toDate=${customDate.toDate}&&page=${page}&&limit=${pageLimit}&&filter=${compName}`
      );
    };

    const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText("");
        }
      };

      const handleNameFilter = (nameText) => {
        console.log("in name filter");
        //setFilterText(nameText)
        startTransition(() => {
          nameFilter(nameText);
        });
      };

      const handleOptionClick = (optionId) => {
        getCustomRepotsData(
          `http://localhost:8081/reportByName?transactionId=${optionId}`
        );
      }

      return (
        <>
          <div className="position-absolute top-0 start-0 ms-3">
            <ButtonComponent
              className=""
              id="dailyReport"
              variant="primary"
              buttonName="Daily Report"
              onClick={() => getDailyReport(1, 10)}
            />
            <ButtonComponent
              className="ms-3"
              id="dailyReport"
              variant="success"
              buttonName="Weekly Report"
              onClick={() => getWeeklyReport(1, 10)}
            />
            <ButtonComponent
              className="ms-3"
              id="dailyReport"
              variant="warning"
              buttonName="Monthly Report"
              onClick={() => getMonthlyReport(1, 10)}
            />
            <div className="position-relative d-inline">
              <ButtonComponent
                className="ms-3"
                id="dailyReport"
                variant="info"
                buttonName="Custom Report"
                onClick={() => toggleCustomReportFidlds(isCustomReport)}
              />
              {isCustomReport ? (
                <div className="position-absolute custom-report-box text-left">
                  <form>
                    <Input
                      size={6}
                      id="fromDate"
                      label="From Date"
                      inputType="textbox"
                      type="date"
                      name="fromDate"
                      onChange={(event) => hanldeCustomReportDateChange(event)}
                    />
                    <Input
                      className="mt-3"
                      size={6}
                      id="toDate"
                      label="To Date"
                      inputType="textbox"
                      type="date"
                      name="toDate"
                      onChange={(event) => hanldeCustomReportDateChange(event)}
                    />
                    <ButtonComponent
                      className="mt-3"
                      id="dailyReport"
                      variant="primary"
                      buttonName="Filter"
                      onClick={() => getCustomFilterData(1, 10)}
                    />
                  </form>
                </div>
              ) : null}
            </div>
          </div>
          <ExportToExcelComp reportType={reportType}/>
          <FilterComponent handleOptionClick={handleOptionClick} isLoading={isPending} handleSearch={handleNameFilter} options={nameSearchData} labelKey="name" />
        </>
      );
    }, [filterText, resetPaginationToggle, isCustomReport, customDate, nameSearchData]);

    const dataFetcher = (name) => {
      getNameSearchData(
        `http://localhost:8081/nameList?firstName=${name}&&page=${1}&&limit=${10}`
      );
    };

    const handleDebounce = (callBack, time) => {
      let timer;
      return function (arg) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          callBack(arg);
        }, time);
      };
    };

    const nameFilter = handleDebounce((nameText) => dataFetcher(nameText), 300);

    useEffect(() => {
      //getReportData(page, 10);
      setReportError(null);
    }, []);

    const getNameSearchData = async (url) => {
      const getResponse = await get(url);
      if (getResponse) {
        setIsloader(false);
      }
      if (getResponse.status === 200 && !getResponse.error) {
        setNameSearchData(getResponse.data);
      } else {
        if (getResponse.status === 403) {
          navigate("/Unauthorized");
        } else {
          setReportError(getResponse);
          setIsToster(true);
        }
      }
    };

    const getCustomRepotsData = async (url) => {
      setIsloader(true);
      const getResponse = await get(url);
      if (getResponse) {
        setIsloader(false);
      }
      if (getResponse.status === 200 && !getResponse.error) {
        setReportData(getResponse.data.transactionData);
        setReportDataCount(getResponse.data.count);
      } else {
        if (getResponse.status === 403) {
          navigate("/Unauthorized");
        } else {
          setReportError(getResponse);
          setIsToster(true);
        }
      }
    };

    const getReportData = async (pageNo, pageLimit) => {
      setIsloader(true);
      let getResponse = null;

      if(compName === "Report"){
        getResponse = await get(
          `http://localhost:8081/report?page=${pageNo}&&limit=${pageLimit}`
        )
      }else if(compName === "History"){
        getResponse = await get(
          `http://localhost:8081/transactionHistory?transactionId=${params.id}&&page=${pageNo}&&limit=${limit}`
        );
      }else if( compName === "Pending"){
        getResponse = await get(
          `http://localhost:8081/pendingTransactions?page=${pageNo}&&limit=${pageLimit}`
        )
      }else if( compName === "Completed"){
        getResponse = await get(
          `http://localhost:8081/completedTransactions?page=${pageNo}&&limit=${pageLimit}`
        )
      }
        // compName === "Report"
        //   ? await get(
        //       `http://localhost:8081/report?page=${pageNo}&&limit=${pageLimit}`
        //     )
        //   : await get(
        //       `http://localhost:8081/transactionHistory?transactionId=${params.id}&&page=${pageNo}&&limit=${limit}`
        //     );
      if (getResponse) {
        setIsloader(false);
      }
      if (getResponse.status === 200 && !getResponse.error) {
        setReportData(getResponse.data.transactionData);
        setReportDataCount(getResponse.data.count);
      } else {
        if (getResponse.status === 403) {
          navigate("/Unauthorized");
        } else {
          setReportError(getResponse);
          setIsToster(true);
        }
      }
    };

    const columns = [
      {
        name: "First Name",
        selector: (row) => row.firstName,
        sortable: true,
      },
      {
        name: "Last Name",
        selector: (row) => row.lastName,
        sortable: true,
      },
      {
        name: "Email Id",
        selector: (row) => row.email,
      },
      {
        name: "Mobile No.",
        selector: (row) => row.mobileNo,
      },
      {
        name: "Date of Birth",
        selector: (row) => format(parseISO(row.dateOfBirth), "dd/MM/yyyy"),
      },
      {
        name: "Address",
        selector: (row) => row.address,
      },
      {
        name: "Product",
        selector: (row) => row.product,
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,
      },
      {
        name: "Amount Paid",
        selector: (row) => row.amountPaid,
        sortable: true,
      },
      {
        name: "Total Amount Paid",
        selector: (row) => row.totalAmountPaid,
        sortable: true,
      },
      {
        name: "Amount Pending",
        selector: (row) => row.amountPending,
        sortable: true,
      },
      {
        name: "Id Card",
        selector: (row) => row.idCardType,
      },
      {
        name: "Id Card No.",
        selector: (row) => row.idCardNumber,
      },
      {
        name: "Photo",
        selector: (row) => {
          return (
            <a href={row.customerPic} target="_blank">
              {row.customerPicName}
            </a>
          );
        },
      },
      {
        name: "Transaction Date",
        selector: (row) => {
          return (
            <span
              title={format(
                parseISO(row.transactionDate),
                "dd/MM/yyy'-'HH:mm:ss"
              )}
            >
              {format(parseISO(row.transactionDate), "dd/MM/yyy'-'HH:mm:ss")}
            </span>
          );
        },
      },
      {
        name: "Reference By",
        selector: (row) => row.referenceBy,
      },
      {
        name: "Reference Contact No.",
        selector: (row) => row.referenceByNo,
      },
      {
        name: "Comment",
        selector: (row) => row.comment,
      },
      {
        name: "Transaction Status",
        selector: (row) => {
          return (
            <span
              className={
                row.transactionStatus === "Pending"
                  ? "text-danger"
                  : "text-success"
              }
            >
              {row.transactionStatus}
            </span>
          );
        },
      },
      {
        name: "Action",
        cell: (row) => {
          return (
            <>
              <button
                className="bg-transparent border-0"
                onClick={() => {
                  ViewInformation(row);
                }}
              >
                <EyeFill title="View" />
              </button>
              <button
                className="bg-transparent border-0"
                onClick={() => handleEddit(row)}
                disabled={row.transactionStatus === "Completed"}
              >
                <PencilFill title="Edit" />
              </button>
              <button
                className="bg-transparent border-0"
                onClick={() => handleHistory(row)}
              >
                <ClockHistory title="History" />
              </button>
            </>
          );
        },
        omit: compName === "History" || compName === "Completed",
      },
    ];

    const handleHistory = (data) => {
      navigate(`/History/${data._id}`);
    };

    const handleEddit = (data) => {
      navigate(`/CustomerDetails/EditCustomerInformation/${data._id}`);
    };

    const ViewInformation = (data) => {
      navigate(`/CustomerDetails/ViewInformation/${data._id}`);
    };

    const handlePerRowsChange = (pageLimit, pageNo) => {
      setLimit(pageLimit);
      paginationReportHandler(pageNo);
    };

    const handlePageChange = (page) => {
      paginationReportHandler(page);
    };

    const paginationReportHandler = (page) => {
      if (reportType === "default") {
        getReportData(page, limit);
      }
      if (reportType === "daily") {
        getDailyReport(page, limit);
      }
      if (reportType === "weekly") {
        getWeeklyReport(page, limit);
      }
      if (reportType === "monthly") {
        getMonthlyReport(page, limit);
      }
      if (reportType === "custom") {
        getCustomFilterData(page, limit);
      }
    };

    const closeToster = () => {
      setIsToster(false);
    };

    return (
      <Comp
        closeToster={closeToster}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        columns={columns}
        subHeaderComponentMemo={subHeaderComponentMemo}
        filteredItems={filteredItems}
        reportDataCount={reportDataCount}
        isLoader={isLoader}
        isToster={isToster}
        reportError={reportError}
      />
    );
  }
  return InnerCom;
};

export default ReportsHoc;
