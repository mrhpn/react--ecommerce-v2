import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import _ from 'lodash';

const loadingProducts = () => {
  return (
    <>
      <div className="container flex">
        <div className="row text-center">
          {_.range(1, 7).map(() => (
            <div className="col-6 col-sm-4 col-md-2">
              <Skeleton variant="rectangular" width={150} height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default loadingProducts;
