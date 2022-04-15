import React, { useState, useEffect } from 'react';
import AddressForm from '../components/addressForm';
import PaymentForm2 from '../components/paymentForm2';
import checkout from '../services/checkout';
import AddressForm2 from '../components/addressForm2';
import { Steps, Step, useSteps, StepsStyleConfig } from 'chakra-ui-steps';
import { FiShoppingBag, FiMapPin, FiDollarSign } from 'react-icons/fi';
import {
  ChakraProvider,
  Box,
  extendTheme,
  Flex,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Loading from '../components/loading';

const steps = [
  { label: 'Address', icon: FiMapPin },
  { label: 'Payment', icon: FiDollarSign },
];

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
    else return <div>This is wired.</div>;
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
            Keep Shopping <FiShoppingBag className="ml-2" />
          </Button>
        </Link>
      </div>
    ) : (
      <Loading label="Performing your order..." />
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
    <div className="container mx-auto justify-content-center">
      <ChakraProvider theme={theme}>
        <Box p={5} maxW={500}>
          <Steps colorScheme="messenger" activeStep={activeStep}>
            {steps.map(({ label, icon }) => (
              <Step label={label} icon={icon} key={label}>
                {checkoutToken ? (
                  <Form />
                ) : (
                  <Loading label="Preparing a checkout..." />
                )}
              </Step>
            ))}
          </Steps>
          {activeStep === steps.length && (
            <Flex px={4} py={4} width="100%" flexDirection="column">
              <Confirmation />
            </Flex>
          )}
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Checkout2;
