import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import styles from '../../styles/css/LoadingInidcator.module.css';

const LoadingIndicator = (props) => {
  return (
    <div className={`${!!props.loading && styles.backdrop}`}>
      <PuffLoader color="#1dc4e9" loading={!!props.loading} size={150} />
    </div>
  );
};

export default LoadingIndicator;
