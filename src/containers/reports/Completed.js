import React from 'react';
import ReportTable from "./ReportTable";
import ReportsHoc from "./ReportsHoc";

const Completed = (props) => {
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
            title="Completed Transactions"
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
  )
}

const CompletedComp = ReportsHoc(Completed, "Completed")

export default CompletedComp