import React from "react";
import ReportTable from "./ReportTable";
import ReportsHoc from "./ReportsHoc";

const Report = (props) => {
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
      title="Report"
      columns={columns}
      data={filteredItems}
      progressPending={isLoader}
      pagination={true}
      paginationServer={true}
      paginationTotalRows={reportDataCount}
      handlePerRowsChange={handlePerRowsChange}
      handlePageChange={handlePageChange}
      subHeader={true}
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

const ReportComp = ReportsHoc(Report, "Report")

export default ReportComp;
