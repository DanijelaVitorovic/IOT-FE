import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { formatDate, formatDateWithTimestamp } from '../../../utils';
import { columnTypes } from '../../../constants/globals';

function TableRow(props) {
  const { item, index, config } = props || {};
  const { columns } = config || {};

  const renderCell = (column) => {
    const {
      key,
      type,
      condition,
      onClick,
      subobjectData,
      icon,
      path,
      className,
      stylization,
      options,
      timestamp,
    } = column || {};

    if (condition && !condition()) {
      return null;
    }

    const conditionActionContent = (
      onClickAction,
      entity,
      icon,
      tooltipTitle
    ) => {
      return (
        <td key={key} className="text-center">
          <Link
            onClick={onClickAction ? () => onClickAction(entity) : null}
            to="#"
          >
            <Tooltip title={tooltipTitle} placement="top" arrow={true}>
              <i className={icon} />
            </Tooltip>
          </Link>
        </td>
      );
    };

    switch (type) {
      case columnTypes.value:
        return (
          <td key={key} className={className} style={stylization && item.style}>
            {item[key]}
          </td>
        );
      case columnTypes.boolean:
        const message = item[key] ? options[0] : options[1];
        return (
          <td key={key} className={className}>
            {message}
          </td>
        );
      case columnTypes.date:
        const columnValue =
          item[key] &&
          (timestamp
            ? formatDateWithTimestamp(item[key])
            : formatDate(item[key]));
        return (
          <td key={key} className={className}>
            {columnValue || ''}
          </td>
        );
      case columnTypes.subobject:
        let subobjectValues = '';
        for (let i = 0; i < subobjectData.length; i++) {
          let entity = item[key];
          if (Array.isArray(subobjectData[i]) && subobjectData[i].length > 1) {
            subobjectData[i].forEach((d) => (entity = entity?.[d]));
            entity && (subobjectValues = subobjectValues.concat(entity + ' '));
          } else {
            if (item[key]?.[subobjectData[i]]) {
              subobjectValues =
                subobjectValues.concat(item[key]?.[subobjectData[i]]) + ' ';
            }
          }
        }
        return (
          <td key={key} className={className}>
            {subobjectValues}
          </td>
        );
      case columnTypes.action:
        return (
          <td key={key} className="text-center">
            <Link
              onClick={onClick ? () => onClick(item) : null}
              to={path || '#'}
            >
              <i className={icon} />
            </Link>
          </td>
        );
      case columnTypes.actionWhenKeyIsAction:
        const onClickWhenKeyIsAction = item[key] || {};
        return (
          <td key={key} className="text-center">
            <Link onClick={() => onClickWhenKeyIsAction(item)} to="#">
              <i className={icon} />
            </Link>
          </td>
        );
      case columnTypes.condition_action:
        const { actions, actionCondition } = column || {};

        //_ca je za konstante za tip condition_action.

        const { onClick_ca, icon_ca, tooltipTitle_ca } = actionCondition(item)
          ? actions[0]
          : actions[1] || {};

        return conditionActionContent(
          onClick_ca,
          item,
          icon_ca,
          tooltipTitle_ca || ''
        );
      case columnTypes.enum:
        const itemData = options?.find((option) => option.value === item[key]);
        const itemDataText = itemData?.text || '';
        const itemDataIcon = itemData?.icon || '';
        return (
          <td key={key} className={className}>
            {itemDataIcon} {itemDataText}
          </td>
        );
      default:
        return <td key={key} />;
    }
  };

  return (
    <tr>
      <td>{index}</td>
      {columns.map(renderCell)}
    </tr>
  );
}

export default TableRow;
