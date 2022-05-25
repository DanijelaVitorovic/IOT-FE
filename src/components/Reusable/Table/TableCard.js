import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import SearchFilter from '../SearchFilter';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const TableCard = (props) => {
  const {
    title,
    shouldRenderAdd,
    addAction,
    tooltipText,
    children,
    titleTag,
    shouldRemoveSearch,
    titleIcon,
    titleTextColor,
    cardBackgroundColor,
    items,
    setData,
    columns,
  } = props || {};
  const hTag = titleTag || 'h3';

  return (
    <Card className={`table-card-style wrapper-fade-in ${cardBackgroundColor}`}>
      <Card.Header className="table-card-header-style">
        <Row>
          <Col md={8}>
            <Card.Title as={hTag} className={titleTextColor}>
              <i className={titleIcon && `mr-3 ${titleIcon}`}></i>
              {title}
            </Card.Title>
          </Col>
          {!shouldRemoveSearch && (
            <Col md={shouldRenderAdd ? 3 : 4}>
              <SearchFilter items={items} setData={setData} columns={columns} />
            </Col>
          )}
          {shouldRenderAdd && (
            <Col md={1} className="text-center">
              <Tooltip title={tooltipText} placement="top" arrow={true}>
                <Link onClick={addAction} to="#">
                  <i className="fas fa-plus fa-2x" />
                </Link>
              </Tooltip>
            </Col>
          )}
        </Row>
      </Card.Header>
      {children}
    </Card>
  );
};

export default TableCard;
