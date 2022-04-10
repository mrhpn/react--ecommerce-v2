import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import { StepLabel } from '@mui/material';
import AddressForm from '../components/addressForm';
import PaymentForm from '../components/paymentForm';
import { commerce } from '../lib/commerce';

const steps = ['Shipping address', 'Payment'];

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );

  const Confirmation = () => <div>Confirmation</div>;

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        console.log('lll');
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };

    generateToken();
  }, [cart]);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <Paper sx={{ width: '50%' }}>
        <Typography variant="h5" margin={3} align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className="mx-4">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="mx-5 mt-3">
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Checkout;
