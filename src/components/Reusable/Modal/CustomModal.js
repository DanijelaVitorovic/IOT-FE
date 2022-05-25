import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from '../../../styles/css/Modal.module.css';

const CustomModal = ({
  show,
  hideModal,
  title,
  modalSize,
  secondModal,
  wideModal,
  children,
  backdrop,
}) => {
  const size = modalSize || 'lg';
  let className = '';
  if (secondModal) {
    className = styles['second-modal'];
  } else if (wideModal) {
    className = styles['wide-modal'];
  } else if (secondModal && wideModal) {
    className = `${styles['second-modal']} ${styles['wide-modal']}`;
  }

  const backdropValue = backdrop || 'static';

  return (
    <Modal
      show={show}
      onHide={hideModal}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`${styles['modal-content']} ${className}`}
      backdrop={backdropValue}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
