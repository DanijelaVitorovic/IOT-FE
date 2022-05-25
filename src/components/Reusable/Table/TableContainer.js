import React, { useState } from 'react';
import Table from './Table';
import TableCard from './TableCard';
import '../../../styles/css/Table.css';
import LoadingIndicator from '../LoadingIndicator';

const TableContainer = (props) => {
  const {
      shouldRenderAdd,
      addAction,
      translations,
      tableId,
      tableConfig,
      items,
      page,
      rowsPerPage,
      loading,
    } = props || {},
    { tableTitle, Tooltips, HeaderColumns } = translations || {};
  const [data, setData] = useState(null);

  return (
    <TableCard
      title={tableTitle}
      shouldRenderAdd={shouldRenderAdd}
      addAction={addAction}
      tooltipText={Tooltips?.addItem}
      items={items}
      setData={setData}
      columns={tableConfig?.columns}
    >
      <Table
        config={tableConfig}
        id={tableId}
        items={data || items}
        translations={HeaderColumns}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <LoadingIndicator loading={loading} />
    </TableCard>
  );
};

export default TableContainer;
