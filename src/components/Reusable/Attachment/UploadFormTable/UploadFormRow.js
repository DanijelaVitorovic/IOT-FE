import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class UploadFormRow extends Component {
  constructor(props) {
    super(props);
  }

  onDeleteClick = (fileName) => {
    this.props.handleDelete(fileName);
  };

  render() {
    const { uploadedFile } = this.props;

    return (
      <tr>
        <td className="text-left">{uploadedFile}</td>
        <td className="text-center">
          <Link
            id="deleteDocument"
            onClick={() => this.onDeleteClick(uploadedFile)}
          >
            <i className="fas fa-trash-alt fa-2x iconColor deleteIcon" />
          </Link>
        </td>
      </tr>
    );
  }
}
