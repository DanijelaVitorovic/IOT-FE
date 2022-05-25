import React, { Fragment } from 'react';

const ErrorLabel = (props) => {
  return (
    <Fragment>
      {props.error && (
        <label
          className={`${props.className} wrapper-fade-in-short`}
          style={{ color: 'red', fontWeight: 'bold' }}
        >
          {props.error}
        </label>
      )}
    </Fragment>
  );
};

export default ErrorLabel;
