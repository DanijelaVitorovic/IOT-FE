import React, { Component } from 'react';
import XLSX from 'xlsx';
import ViewAttachedExcelDocumentTable from './ViewAttachedExcelDocumentTable';

class ViewAttachedExcelDocument extends Component {
  constructor(props) {
    super(props);
  }

  /* generate an array of column objects */
  make_cols = (refstr) => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i)
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };

  render() {
    const { content } = this.props;
    if (!content) {
      return <div></div>;
    }

    const excelData = this.parseFile(this.props.content, 0);

    return (
      <div className="file-preview-wrapper-div">
        <div className="col-xs-12">
          <ViewAttachedExcelDocumentTable
            data={excelData.data}
            cols={excelData.cols}
          />
        </div>
      </div>
    );
  }

  parseFile(content, sheetNumber) {
    const wb = XLSX.read(content, { type: 'base64' });

    /* Get first worksheet */
    const wsname = wb.SheetNames[sheetNumber];
    const ws = wb.Sheets[wsname];

    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    const cols = this.make_cols(ws['!ref']);
    return {
      data,
      cols,
    };
  }
}

export default ViewAttachedExcelDocument;
