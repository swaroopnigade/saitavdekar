import React from "react";
import DataTable from "react-data-table-component";
import Toaster from "../../components/Toaster";
import Spinner from "react-bootstrap/Spinner";

const ReportTable = (props) => {
  const {
    title,
    columns,
    data,
    progressPending,
    pagination,
    paginationServer,
    paginationTotalRows,
    handlePerRowsChange,
    handlePageChange,
    subHeader,
    subHeaderComponentMemo,
    persistTableHead,
    highlightOnHover,
    fixedHeader,
    fixedHeaderScrollHeight,
    isToster,
    closeToster,
    reportError
  } = props;
  return (
    <div>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        progressPending={progressPending}
        pagination={pagination}
        paginationServer={paginationServer}
        paginationTotalRows={paginationTotalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        subHeader={subHeader}
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead={persistTableHead}
        progressComponent={
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="btn-spinner"
          />
        }
        highlightOnHover={highlightOnHover}
        fixedHeader={fixedHeader}
        fixedHeaderScrollHeight={fixedHeaderScrollHeight}
      />
      <Toaster
        apiResponseData={reportError}
        isToster={isToster}
        closeToster={closeToster}
      />
    </div>
  );
};

export default ReportTable;
