import { Button } from '@mui/material';
import React from 'react';
import '../../styles/css/Button.css';
import withTranslations from '../../utils/HighOrderComponent';

const ButtonSave = (props) => {
  const { variant, disabled, gt, label, signalForPreview } = props || {};
  const variantValue = variant || 'contained';
  const buttonLabel = label || gt.Button.save;
  return (
    <Button
      variant={variantValue}
      className="col-md-6 shadow-2 m-auto"
      type="submit"
      disabled={disabled}
    >
      {!signalForPreview ? buttonLabel : gt.Button.control}
    </Button>
  );
};

export default withTranslations(ButtonSave);
