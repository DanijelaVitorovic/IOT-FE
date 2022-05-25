import React from 'react';
import { fetchAppVersionFromSessionStorage } from '../../utils';
import LoadingIndicator from '../Reusable/LoadingIndicator';
import AnimatedFormWrapper from '../UI/AnimatedFormWrapper';

const LoginFormWrapper = (props) => {
  return (
    <AnimatedFormWrapper>
      <div className="mb-4">
        <LoadingIndicator loading={props.loading} />
        <i style={{ color: 'aqua' }} className="fas fa-lock"></i>
        <p>{props.appName + ' ' + fetchAppVersionFromSessionStorage()}</p>
        <h3 className="mt-2 mb-4">{props.title}</h3>
      </div>
      {props.children}
    </AnimatedFormWrapper>
  );
};

export default LoginFormWrapper;
