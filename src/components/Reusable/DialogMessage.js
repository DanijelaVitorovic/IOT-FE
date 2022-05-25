import React from 'react';
import withTranslations from '../../utils/HighOrderComponent';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Button } from 'react-bootstrap';

const DialogMessage = (props) => {
  const { gt, show, onClose, message } = props || {};
  const variantValue = props.variant ? props.variant : 'primary';

  return (
    <Dialog
      open={show}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant={variantValue} onClick={onClose}>
          {gt.Button.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslations(DialogMessage);
