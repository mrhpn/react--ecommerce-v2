import React, { useState, useEffect } from 'react';
import AddressForm from '../components/addressForm';
import PaymentForm from '../components/paymentForm';
import checkout from '../services/checkout';
import AddressForm2 from '../components/addressForm2';
import { Steps, Step, useSteps, StepsStyleConfig } from 'chakra-ui-steps';
import { FiMapPin, FiDollarSign } from 'react-icons/fi';
import {
  ChakraProvider,
  Box,
  extendTheme,
  Input,
  Flex,
  Spacer,
  FormLabel,
  Button,
  Select,
} from '@chakra-ui/react';

const steps = [{ label: 'Address' }, { label: 'Payment' }];

const theme = extendTheme({
  components: {
    Steps: StepsStyleConfig,
  },
});

const Checkout2 = ({ cart, order, onCaptureCheckout, error }) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  // const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState({}); // todo: change default value to null
  const [shippingData, setShippingData] = useState({});

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  // const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const backStep = () => {};

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm2 checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
      />
    );

  const Confirmation = () => <div>Confirmation</div>;

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await checkout.generateToken(cart.id);
        setCheckoutToken(token);
      } catch (error) {
        //todo: handle errors
      }
    };

    // generateToken();
  }, [cart]);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <ChakraProvider theme={theme}>
        <Box p={5} maxW={500}>
          <Steps activeStep={activeStep}>
            {steps.map(({ label }, index) => (
              <Step label={label} key={label}>
                <div className="mt-3">
                  {activeStep === steps.length ? (
                    <Confirmation />
                  ) : (
                    checkoutToken && <Form />
                  )}
                </div>
              </Step>
            ))}
          </Steps>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Checkout2;
