import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../../styles/css/ConfirmDialog.css';

export const confirmDialog = (
  message,
  action,
  optionalMessage,
  globalTranslations,
  actionNo
) => {
  const translation = globalTranslations.Button;

  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div id="react-confirm-alert">
          <div className="react-confirm-alert">
            <div className={`custom-ui button`}>
              <p>{message}</p>
              <button
                onClick={() => {
                  actionNo && actionNo();
                  onClose();
                }}
              >
                {translation.no}
              </button>
              <button
                onClick={() => {
                  action();
                  onClose();
                }}
              >
                {translation.yes + optionalMessage}
              </button>
            </div>
          </div>
        </div>
      );
    },
  });
};
