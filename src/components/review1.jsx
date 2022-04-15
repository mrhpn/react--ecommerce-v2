import React from 'react';

const Review1 = ({ checkoutToken }) => {
  console.log(checkoutToken);
  return (
    <>
      <div className="h5 mt-4">Order Summary</div>
      {checkoutToken.live.line_items.map((product) => (
        <div
          className="d-flex justify-content-between"
          style={{ padding: '10px 0' }}
          key={product.name}>
          <div className="h6">
            <span className="text-black">{product.name}</span>{' '}
            <small className="text-secondary">(x{product.quantity})</small>
          </div>
          <div>{product.line_total.formatted_with_symbol}</div>
        </div>
      ))}
      <hr />
      {/* <div
        className="d-flex justify-content-between"
        style={{ padding: '10px 0' }}>
        <div className="display-5">Total</div>
        <h4 style={{ fontWeight: 700 }}>
          {checkoutToken}
        </h4>
      </div> */}
      <hr />
      <div
        className="d-flex justify-content-between"
        style={{ padding: '10px 0' }}>
        <div className="display-5">Total</div>
        <h4 style={{ fontWeight: 700 }}>
          {checkoutToken.live.subtotal.formatted_with_symbol}
        </h4>
      </div>
      <hr />
    </>
  );
};

export default Review1;
