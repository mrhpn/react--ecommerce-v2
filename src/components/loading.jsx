import React from 'react';
import { Spinner } from '@chakra-ui/react';

const Loading = ({ label }) => {
  return (
    <div className="d-flex justify-content-center mx-auto my-3">
      <Spinner />
      <div className="ml-3">{label}</div>
    </div>
  );
};

export default Loading;
