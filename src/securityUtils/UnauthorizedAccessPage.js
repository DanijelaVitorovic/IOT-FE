import React from 'react';
import AnimatedFormWrapper from '../components/UI/AnimatedFormWrapper';
import withTranslations from '../utils/HighOrderComponent';

const UnauthorizedAccessPage = (props) => {
  const { title } = props?.t || '';
  return (
    <AnimatedFormWrapper>
      <div className="mb-4">
        <i style={{ color: 'aqua' }} className="fas fa-coffee"></i>
        <h2 className="mt-2 mb-4">{'404'}</h2>
        <h4 className="mt-2 mb-4">{title}</h4>
      </div>
    </AnimatedFormWrapper>
  );
};

export default withTranslations(
  UnauthorizedAccessPage,
  'UnauthorizedAccessPage'
);
