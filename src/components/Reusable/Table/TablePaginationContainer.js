import React from 'react';
import { TablePagination } from '@mui/material';
import { changePaginationTextToSerbian } from '../../../utils';
import { rowsPerPageOptions } from '../../../constants/globals.js';

const TablePaginationContainer = (props) => {
  const {
    totalElements,
    activePage,
    pageSize,
    setActivePage,
    setPageSize,
    translations,
  } = props || {};

  const pageChangeHandler = (event, value) => {
    setActivePage(value);
  };
  const rowsPerPageChangeHandler = (event, value) => {
    setPageSize(event.target.value);
    setActivePage(0);
  };

  return (
    <div
      className="wrapper-fade-in"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <TablePagination
        component="div"
        count={Number(totalElements)}
        page={activePage}
        onPageChange={pageChangeHandler}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={rowsPerPageChangeHandler}
        rowsPerPage={pageSize}
        labelRowsPerPage={translations.rowPerPage}
        labelDisplayedRows={(obj) =>
          changePaginationTextToSerbian(obj, translations.of)
        }
      />
    </div>
  );
};

export default TablePaginationContainer;
