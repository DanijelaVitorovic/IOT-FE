import React from 'react';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';

const CustomButton = (props) => {
  const {
    label,
    type,
    tooltipText,
    tooltipPlacement,
    variant,
    endIcon,
    startIcon,
    className,
    onClick,
  } = props || {};

  const BasicButton = () => (
    <Button
      variant={variant || 'contained'}
      endIcon={endIcon || null}
      onClick={onClick}
      className={`${className}`}
      startIcon={startIcon}
      type={type || 'submit'}
    >
      {label}
    </Button>
  );

  const TooltipButton = () => {
    return (
      <Tooltip
        title={tooltipText}
        placement={tooltipPlacement || 'top'}
        arrow={true}
      >
        <div>
          <BasicButton />
        </div>
      </Tooltip>
    );
  };

  return tooltipText ? <TooltipButton /> : <BasicButton />;
};

export default CustomButton;
