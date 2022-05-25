import React from 'react';
import TableRow from './TableRow';
import { Table as BootstrapTable } from 'react-bootstrap';

function Table(props) {
  const { config, id, items, translations, rowsPerPage, page } = props || {};
  const { columns } = config || {};

  const renderItem = (item, index) => (
    <TableRow
      index={++index}
      key={index + '_' + item.id}
      item={item}
      config={config}
    />
  );

  const renderItemsList = () =>
    items?.map((item, index) => {
      const numberOfItem = Number(rowsPerPage && page ? rowsPerPage * page : 0);
      const itemIndex = index + numberOfItem;
      return renderItem(item, itemIndex);
    });

  const renderHeader = (column) => {
    const { key, width, className, condition } = column || {};

    if (condition && !condition()) {
      return null;
    }

    return (
      <th key={key} width={width} className={className}>
        {translations[key]}
      </th>
    );
  };

  return (
    <BootstrapTable responsive hover id={`table_${id}`} className="table-sm">
      <thead>
        <tr>
          <th width="4%">#</th>
          {columns.map(renderHeader)}
        </tr>
      </thead>
      <tbody>{renderItemsList()}</tbody>
    </BootstrapTable>
  );
}

export default Table;
