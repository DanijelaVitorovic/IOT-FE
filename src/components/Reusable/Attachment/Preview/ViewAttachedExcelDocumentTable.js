import React, { Component } from 'react';
import XLSX from 'xlsx';

class ViewAttachedExcelDocumentTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="table-responsive tableHeightExcel">
        <table className="table table-striped">
          <thead>
            <tr className="table-header-row text-center">
              {this.props.cols.map((c) => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((r, i) => (
              <tr key={i}>
                {this.props.cols.map((c) => (
                  <td key={c.key}>{r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/* list of supported file types */
const SheetJSFT = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  'txt',
  'ods',
  'fods',
  'uos',
  'sylk',
  'dif',
  'dbf',
  'prn',
  'qpw',
  '123',
  'wb*',
  'wq*',
  'html',
  'htm',
]
  .map(function (x) {
    return '.' + x;
  })
  .join(',');

export default ViewAttachedExcelDocumentTable;
