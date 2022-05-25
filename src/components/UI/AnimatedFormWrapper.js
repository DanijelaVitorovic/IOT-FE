import React from 'react';

const AnimatedFormWrapper = (props) => {
  return (
    <div className="auth-wrapper wrapper-fade-in-long">
      <div className="auth-content">
        <div className="auth-bg">
          <span className="r" />
          <span className="r s" />
          <span className="r s" />
          <span className="r" />
        </div>
        <div className="card p-2 card-rounded-edges">
          <div className="card-body text-center">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFormWrapper;
