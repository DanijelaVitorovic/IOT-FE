import React from 'react';
import withTranslations from '../../../../utils/HighOrderComponent';
import AttachmentRow from './AttachmentRow';
import { Table } from 'react-bootstrap';

const AttachmentTable = (props) => {
  const {
    attachments,
    t,
    controllerReference,
    signalForDownload,
    signalForDelete,
    signalForPreviewRemoval,
    handleDeleteDocument,
    gt,
  } = props || {};

  const files = attachments?.map((attachment) => (
    <AttachmentRow
      key={attachment.id}
      attachment={attachment}
      controllerReference={controllerReference}
      signalForDownload={signalForDownload}
      signalForDelete={signalForDelete}
      signalForPreviewRemoval={signalForPreviewRemoval}
      handleDelete={handleDeleteDocument}
      translations={t}
      gt={gt}
    />
  ));

  return (
    <Table responsive hover id="table" className="table table-sm">
      <thead>
        <tr className="text-center">
          <th className="text-left">{t.name}</th>
          {!signalForPreviewRemoval && <th width="16%">{t.preview}</th>}
          {!!signalForPreviewRemoval && <th width="16%">{t.fileFormat}</th>}
          {!!signalForDownload && <th width="19%">{t.download}</th>}
          {!!signalForDelete && <th width="16%">{t.delete}</th>}
        </tr>
      </thead>
      <tbody>{files}</tbody>
    </Table>
  );
};
export default withTranslations(AttachmentTable, 'AttachmentTable');
