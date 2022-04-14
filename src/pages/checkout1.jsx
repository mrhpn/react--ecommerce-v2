import React, { useState, useEffect } from 'react';
import { FiMapPin, FiDollarSign } from 'react-icons/fi';
import { Typography, Divider } from '@mui/material';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
import { Steps, Step, useSteps, StepsStyleConfig } from 'chakra-ui-steps';
import FormField from '../components/formInputText';
import { useForm } from 'react-hook-form';
import checkout from '../services/checkout';
import shipping from '../services/shipping';
import Review1 from '../components/review1';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const steps = ['Shipping address', 'Payment'];

const theme = extendTheme({
  components: {
    Steps: StepsStyleConfig,
  },
});

const required = {
  value: true,
  message: 'This is required.',
};

const Checkout1 = ({ cart, order, onCaptureCheckout, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);

  // address
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries: fetchedCountries } = await shipping.getCountries(
      checkoutTokenId
    );
    setShippingCountries(fetchedCountries);
    setShippingCountry(Object.keys(fetchedCountries)[0]);
  };

  const fetchShippingSubdivisions = async (countryCode) => {
    const {
      subdivisions: fetchedSubdivisions,
    } = await shipping.getSubdivisions(countryCode);
    setShippingSubdivisions(fetchedSubdivisions);
    setShippingSubdivision(Object.keys(fetchedSubdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, region) => {
    const options = await checkout.getShippingOptions(
      checkoutTokenId,
      country,
      region
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    if (checkoutToken) fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  console.log(countries);

  const subdivisions = Object.entries(
    shippingSubdivisions
  ).map(([code, name]) => ({ id: code, label: name }));

  const options = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

  // this

  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  });
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const handleNextStep = async () => {
    let isValid = false;

    switch (activeStep) {
      case 0:
        isValid = await trigger([
          'firstName',
          'lastName',
          'address',
          'email',
          'city',
          'zip',
        ]);
        break;
      case 1:
        isValid = await trigger(['city']);
        break;
    }

    if (isValid) nextStep();
  };

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  const handlePayment = async (e, elements, stripe) => {
    e.preventDefault();

    const data = getValues([
      'firstName',
      'lastName',
      'email',
      'address1',
      'city',
      'shippingSubdivision',
      'zip',
      'shippingCountry',
      'shippingOption',
    ]);
    console.log(data);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) console.log(error);
    else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: getValues('firstName'),
          lastname: getValues('lastName'),
          email: getValues('email'),
        },
        shipping: {
          name: 'Primary',
          street: getValues('address1'),
          town_city: getValues('city'),
          country_state: getValues('shippingSubdivision'),
          postal_zip_code: getValues('zip'),
          country: getValues('shippingCountry'),
        },
        fulfillment: {
          shipping_method: getValues('shippingOption'),
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
    <div className="container justify-content-center mt-5">
      <ChakraProvider theme={theme}>
        <Box p={5} maxW={500}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Steps colorScheme="messenger" activeStep={activeStep}>
              <Step label="Address" icon={FiMapPin}>
                <div className="form-row mt-3">
                  <div className="form-group col-md-6">
                    <FormField
                      label="First Name"
                      error={errors.firstName && errors.firstName.message}>
                      <Input
                        variant="flushed"
                        placeholder="John"
                        {...register('firstName', { required })}
                      />
                    </FormField>
                  </div>
                  <div className="form-group col-md-6">
                    <FormField
                      label="Last Name"
                      error={errors.lastName && errors.lastName.message}>
                      <Input
                        variant="flushed"
                        placeholder="Wick"
                        {...register('lastName', { required })}
                      />
                    </FormField>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <FormField
                      label="Address"
                      error={errors.address && errors.address.message}>
                      <Input
                        variant="flushed"
                        placeholder="No.1 Chan Aye Thar Zan"
                        {...register('address', { required })}
                      />
                    </FormField>
                  </div>
                  <div className="form-group col-md-6">
                    <FormField
                      label="Email"
                      error={errors.email && errors.email.message}>
                      <Input
                        variant="flushed"
                        placeholder="john@example.com"
                        {...register('email', { required })}
                      />
                    </FormField>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <FormField
                      label="City"
                      error={errors.city && errors.city.message}>
                      <Input
                        variant="flushed"
                        placeholder="Yangon"
                        {...register('city', { required })}
                      />
                    </FormField>
                  </div>
                  <div className="form-group col-md-6">
                    <FormField
                      label="ZIP / Postal Code"
                      error={errors.zip && errors.zip.message}>
                      <Input
                        variant="flushed"
                        placeholder="11008"
                        {...register('zip', { required })}
                      />
                    </FormField>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <FormLabel>Shipping Country</FormLabel>
                    <Select
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      variant="flushed">
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="form-group col-md-6">
                    <FormLabel>Shipping Subdivision</FormLabel>
                    <Select
                      value={shippingSubdivision}
                      onChange={(e) => setShippingSubdivision(e.target.value)}
                      variant="flushed">
                      {subdivisions.map((subdivision) => (
                        <option key={subdivision.id} value={subdivision.id}>
                          {subdivision.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <FormLabel>Shipping Options</FormLabel>
                    <Select
                      value={shippingOption}
                      onChange={(e) => setShippingOption(e.target.value)}
                      variant="flushed">
                      {options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </Step>
              <Step label="Payment" icon={FiDollarSign}>
                <Review1 checkoutToken={checkoutToken} />
                {/* payment */}
                {/* <Typography
                  variant="h6"
                  gutterBottom
                  style={{ margin: '20px 0' }}>
                  Payment method
                </Typography> */}
                <div className="h5 my-3">Payment Method</div>
                <Elements stripe={stripePromise}>
                  <ElementsConsumer>
                    {({ elements, stripe }) => (
                      <form
                        onSubmit={(e) => handlePayment(e, elements, stripe)}>
                        <CardElement />
                        <br />
                        <div
                          className="justify-content-end"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          {/* <Button variant="outlined" onClick={backStep}>
                            Back
                          </Button> */}
                          <button
                            type="submit"
                            className="btn btn-warning mb-3"
                            disabled={!stripe}>
                            Pay{' '}
                            {checkoutToken.live.subtotal.formatted_with_symbol}
                          </button>
                        </div>
                      </form>
                    )}
                  </ElementsConsumer>
                </Elements>
              </Step>
            </Steps>
          </form>

          {activeStep === 1 && <hr />}
          <Flex gap={2} my={2}>
            {activeStep !== 0 && (
              <Button className="mt-3" onClick={prevStep}>
                Previous
              </Button>
            )}
            {activeStep !== 1 && (
              <Button className="mt-3" onClick={handleNextStep}>
                Next
              </Button>
            )}
          </Flex>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Checkout1;
