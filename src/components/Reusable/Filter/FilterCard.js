import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

const FilterCard = (props) => {
  const { translations, activeKey, showResetButton, onToggle, onReset } =
    props || {};

  const filterCardStyle = activeKey === '0' && 'card-header-open';

  return (
    <div className="Filters card-rounded-edges wrapper-fade-in">
      <Accordion activeKey={activeKey}>
        <Card className="card-rounded-edges">
          <Card.Header
            className={`d-flex flex-row justify-content-between align-items-center ${filterCardStyle}`}
            onClick={onToggle}
          >
            <div className="d-flex flex-row align-items-center gap-3 col-md-2">
              <div>
                <FilterListRoundedIcon />
              </div>
              <div>{translations.title}</div>
            </div>
            {showResetButton && (
              <div className="col-md-1">
                <Button variant="warning" onClick={onReset}>
                  {translations.reset}
                </Button>
              </div>
            )}
          </Card.Header>
          <Accordion.Collapse eventKey={'0'}>
            <Card.Body>{props.children}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default FilterCard;
