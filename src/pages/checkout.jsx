import React from 'react';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import { StepLabel } from '@mui/material';

const steps = ['Shipping address', 'Payment'];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <Paper sx={{ width: '50%' }}>
        <Typography variant="h5" margin={3} align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className="p-3">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </div>
  );
};

export default Checkout;
