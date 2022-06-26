import { columnTypes } from '../../constants/globals';

export const tableConfig = (props) => {
  const {
    editAction,
    deleteAction,
    detailsAction,
    isFridgeUpdateAllowed,
    isFridgeDeleteAllowed,
  } = props || {};

  return {
    columns: [
      {
        key: 'name',
        width: '',
        className: '',
        type: columnTypes.value,
      },
      {
        key: 'edit',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: editAction,
        icon: 'fas fa-edit fa-2x',
        condition: () => isFridgeUpdateAllowed,
      },
      {
        key: 'delete',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: deleteAction,
        icon: 'fas fa-trash-alt fa-2x',
        condition: () => isFridgeDeleteAllowed,
      },
      {
        key: 'details',
        width: '',
        className: 'text-center',
        type: columnTypes.action,
        onClick: detailsAction,
        icon: 'fas fa-search fa-2x',
      },
    ],
  };
};
