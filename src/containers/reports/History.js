import React from "react";
import ReportTable from "./ReportTable";
import ReportsHoc from "./ReportsHoc";

const History = (props) => {
  const {
    closeToster,
    handlePageChange,
    handlePerRowsChange,
    columns,
    subHeaderComponentMemo,
    filteredItems,
    reportDataCount,
    isLoader,
    isToster,
    reportError
  } = props;
  
  return (
    <ReportTable
      title="History"
      columns={columns}
      data={filteredItems}
      progressPending={isLoader}
      pagination={true}
      paginationServer={true}
      paginationTotalRows={reportDataCount}
      handlePerRowsChange={handlePerRowsChange}
      handlePageChange={handlePageChange}
      subHeader={false}
      persistTableHead={true}
      highlightOnHover={true}
      fixedHeader={true}
      fixedHeaderScrollHeight="67vh"
      isToster={isToster}
      closeToster={closeToster}
      subHeaderComponentMemo={subHeaderComponentMemo}
      reportError={reportError}
    />
  );
};

const HistoryComp = ReportsHoc(History, "History")

export default HistoryComp;
