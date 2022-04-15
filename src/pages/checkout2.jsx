import React, { useState, useEffect } from 'react';
import AddressForm from '../components/addressForm';
import PaymentForm2 from '../components/paymentForm2';
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
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
  const [checkoutToken, setCheckoutToken] = useState(null); // todo: change default value to null
  const [shippingData, setShippingData] = useState({});

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () => {
    if (activeStep === 0)
      return (
        <AddressForm2
          shippingData={shippingData}
          checkoutToken={checkoutToken}
          next={next}
        />
      );
    else if (activeStep === 1)
      return (
        <PaymentForm2
          shippingData={shippingData}
          checkoutToken={checkoutToken}
          onCaptureCheckout={onCaptureCheckout}
          backStep={prevStep}
          nextStep={nextStep}
        />
      );
  };

  const Confirmation = () =>
    order.customer ? (
      <div>
        <div className="h5 mt-4">
          Thank you for your purchase, {order.customer.firstname}{' '}
          {order.customer.lastname} !
        </div>
        <h5 className="my-3">Order reference: {order.customer_reference}</h5>
        <hr />
        <Link to="/">
          <Button mt={3} colorScheme="messenger">
            Back to Home
          </Button>
        </Link>
      </div>
    ) : (
      <div className="d-flex justify-content-center mx-auto">
        <Spinner />
        <div className="ml-3">Performing your order...</div>
      </div>
    );

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await checkout.generateToken(cart.id);
        setCheckoutToken(token);
      } catch (error) {
        //todo: handle errors
      }
    };

    generateToken();
  }, [cart]);

  return (
    <div className="container mx-auto justify-content-center mt-5">
      <ChakraProvider theme={theme}>
        <Flex flexDir="column" width="100%">
          <Box p={5} maxW={500}>
            <Steps activeStep={activeStep}>
              {steps.map(({ label }, index) => (
                <Step label={label} key={label}>
                  {checkoutToken && <Form />}
                </Step>
              ))}
            </Steps>
            {activeStep === steps.length && (
              <Flex px={4} py={4} width="100%" flexDirection="column">
                <Confirmation />
              </Flex>
            )}
          </Box>
        </Flex>
      </ChakraProvider>
    </div>
  );
};

export default Checkout2;
