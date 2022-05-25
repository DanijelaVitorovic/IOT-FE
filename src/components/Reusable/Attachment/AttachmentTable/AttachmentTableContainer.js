import React from 'react';
import AttachmentTable from './AttachmentTable';
import TableCard from '../../../Reusable/Table/TableCard';

const AttachmentTableContainer = (props) => {
  const {
    attachments,
    controllerReference,
    signalForDelete,
    signalForDownload,
    title,
    handleDeleteDocument,
    signalForPreviewRemoval,
    titleIcon,
    titleTextColor,
    cardBackgroundColor,
  } = props || {};
  const tableId = 'attachmentTable';
  return (
    <TableCard
      title={title}
      titleIcon={titleIcon}
      titleTextColor={titleTextColor}
      shouldRenderAdd={false}
      tableId={tableId}
      shouldRemoveSearch
      titleTag={'h5'}
      cardBackgroundColor={cardBackgroundColor}
    >
      <div className="pl-3 pr-3">
        <AttachmentTable
          attachments={attachments}
          controllerReference={controllerReference}
          signalForDelete={signalForDelete}
          signalForDownload={signalForDownload}
          signalForPreviewRemoval={signalForPreviewRemoval}
          handleDeleteDocument={handleDeleteDocument}
        />
      </div>
    </TableCard>
  );
};

export default AttachmentTableContainer;
