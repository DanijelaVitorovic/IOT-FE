import React, { Fragment, Component } from 'react';
import { Table } from 'react-bootstrap';
import UploadFormRow from './UploadFormRow';
import withTranslations from '../../../../utils/HighOrderComponent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { allowedFileFormatsText } from '../../../../constants/globals';
import Tooltip from '@mui/material/Tooltip';
import { Container } from '@mui/material';

class UploadFormTable extends Component {
  constructor() {
    super();
  }

  render() {
    let filePreviewTable;
    let fileNames = [];

    const {
      t,
      placeholder,
      enableMultiple,
      name,
      onChange,
      errors,
      allowedFormats,
    } = this.props || {};

    for (let i = 0; i < this.props.uploadedFiles.length; i++) {
      fileNames.push(this.props.uploadedFiles[i].name);
    }

    const uploadedFiles = fileNames.map((uploadedFile, index) => (
      <UploadFormRow
        key={index}
        uploadedFile={uploadedFile}
        handleDelete={this.props.handleDeleteDocument}
      />
    ));

    if (this.props.uploadedFiles && this.props.uploadedFiles.length > 0) {
      filePreviewTable = (
        <Table responsive hover id="table" className="tableData">
          <thead>
            <tr>
              <th width="85%" className="text-left">
                {t.name}
              </th>
              <th width="15%">{t.delete}</th>
            </tr>
          </thead>
          <tbody>{uploadedFiles}</tbody>
        </Table>
      );
    }

    const message = enableMultiple ? t.messageMultiple : t.messageSingle;
    return (
      <Container className="pr-2 pl-2">
        <br />
        <br />
        {filePreviewTable && filePreviewTable}
        <label className="w-100 without-margin-bottom custom-file-upload">
          <input
            name={name}
            type="file"
            accept={allowedFormats || allowedFileFormatsText}
            multiple={enableMultiple}
            onChange={onChange}
          />
          <Tooltip title={placeholder} placement="top" arrow={true}>
            <CloudUploadIcon style={{ color: '#203a5d' }} fontSize={'large'} />
          </Tooltip>
          {placeholder}
          <i></i>
        </label>
        <hr className="lineBreaker col-md-11" />
        {!enableMultiple && (
          <label className="col-md-11">
            <em>
              <span>* </span>
              {message}
            </em>
          </label>
        )}
        <label className="col-md-11 m-auto text-center">
          {errors && (
            <b>
              <span style={{ color: 'red' }}>{errors}</span>
            </b>
          )}
        </label>
      </Container>
    );
  }
}

export default withTranslations(UploadFormTable, 'UploadFormTable');
