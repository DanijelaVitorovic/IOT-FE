import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { downloadAttachment } from '../../../../actions/viewAttachment';
import ModalForDocumentPreview from '../../ModalForDocumentPreview';
import { confirmDialog } from '../../ConfirmDialog';

const AttachmentRow = (props) => {
  const {
    attachment,
    controllerReference,
    signalForDelete,
    signalForDownload,
    signalForPreviewRemoval,
    handleDelete,
    translations,
    downloadAttachment,
    gt,
  } = props || {};
  const { embeddableAttribute } = attachment || {};
  const [showModal, setShowModal] = useState(false);

  const onDownloadClick = () => {
    downloadAttachment(
      embeddableAttribute?.uuidName,
      embeddableAttribute?.name,
      translations.NotificationMessages,
      controllerReference
    );
  };

  const onPreviewClick = () => {
    return setShowModal(true);
  };

  const onPreviewClose = () => {
    return setShowModal(false);
  };

  const onDeleteClick = (attachment) => {
    const { ConfirmDialog } = translations;

    const action = () => handleDelete(attachment.id);

    confirmDialog(
      ConfirmDialog.confirmMessage,
      action,
      ConfirmDialog.confirmDelete,
      gt
    );
  };

  const rowContent = (
    <tr>
      <td className="text-left">{embeddableAttribute?.name}</td>
      {!signalForPreviewRemoval && (
        <td className="text-center">
          <Link id="previewFile" onClick={onPreviewClick}>
            <i className="fas fa-search fa-2x" />
          </Link>
        </td>
      )}
      {!!signalForPreviewRemoval && (
        <td className="text-center">{embeddableAttribute?.mimeTypeShort}</td>
      )}
      {!!signalForDownload && (
        <td className="text-center">
          <Link id="downloadFile" onClick={onDownloadClick}>
            <i className="fas fa-download"></i>
          </Link>
        </td>
      )}
      {!!signalForDelete && (
        <td className="text-center">
          <Link id="deleteDocument" onClick={() => onDeleteClick(attachment)}>
            <i className="fas fa-trash-alt fa-2x iconColor deleteIcon" />
          </Link>
        </td>
      )}
    </tr>
  );

  return (
    <Fragment>
      {rowContent}
      {showModal && (
        <ModalForDocumentPreview
          documentName={embeddableAttribute.uuidName}
          controllerReference={controllerReference}
          handleClose={onPreviewClose}
          show={showModal}
        />
      )}
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    downloadAttachment: (
      uuidDocName,
      attachmentName,
      message,
      controllerReference
    ) => {
      dispatch(
        downloadAttachment(
          uuidDocName,
          attachmentName,
          message,
          controllerReference
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(AttachmentRow);
