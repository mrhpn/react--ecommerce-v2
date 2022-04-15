import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './review';
import Loading from './loading';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  nextStep,
  onCaptureCheckout,
}) => {
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) setCardError(error);
    else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <div>
      <Review checkoutToken={checkoutToken} />
      <hr />
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <br />
              {paymentLoading && <Loading label="Loading payment method..." />}
              <CardElement onReady={() => setPaymentLoading(false)} />
              <div className="text-danger mt-2">{cardError.message}</div>
              <div
                style={{
                  display: 'flex',
                  margin: '20px 0px 60px 0px',
                  justifyContent: 'space-between',
                }}>
                <Button onClick={backStep}>Back</Button>
                <Button colorScheme="yellow" type="submit" isDisabled={!stripe}>
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
