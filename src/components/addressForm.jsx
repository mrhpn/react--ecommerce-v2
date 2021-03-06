import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, FormLabel, Input, Select } from '@chakra-ui/react';
import FormField from './formField';
import Loading from './loading';
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from 'react-icons/hi';
import shipping from '../services/shipping';
import checkoutServices from '../services/checkout';
import { isValidEmail } from '../utils/validateEmail';

const required = {
  value: true,
  message: 'This is required.',
};

const minLength = {
  value: 3,
  message: 'Minimum length is 3.',
};

const maxLength = {
  value: 20,
  message: 'Maximum length is 20.',
};

const AddressForm = ({ shippingData, checkoutToken, next }) => {
  const [loading, setLoading] = useState(true);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);

  const _firstName = shippingData.firstName;
  const _lastName = shippingData.lastName;
  const _address = shippingData.address;
  const _email = shippingData.email;
  const _city = shippingData.city;
  const _zip = shippingData.zip;
  const _shippingCountry = shippingData.shippingCountry;
  const _shippingSubdivision = shippingData.shippingSubdivision;
  const _shippingOption = shippingData.shippingOption;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      firstName: _firstName,
      lastName: _lastName,
      address: _address,
      email: _email,
      city: _city,
      zip: _zip,
      shippingCountry: _shippingCountry,
      shippingSubdivision: _shippingSubdivision,
      shippingOption: _shippingOption,
    },
  });

  const handleNextStep = async (values) => {
    let isValid = false;

    isValid = await trigger([
      'firstName',
      'lastName',
      'address',
      'email',
      'city',
      'zip',
    ]);

    if (isValid) next(values);
  };

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
    const _options = await checkoutServices.getShippingOptions(
      checkoutTokenId,
      country,
      region
    );
    setShippingOptions(_options);

    setShippingOption(_options[0].id);
  };

  useEffect(() => {
    if (shippingCountries.length === 0)
      fetchShippingCountries(checkoutToken.id);
  }, []);

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

  const subdivisions = Object.entries(
    shippingSubdivisions
  ).map(([code, name]) => ({ id: code, label: name }));

  const options = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

  useEffect(() => {
    if (
      shippingCountries.length === 0 ||
      shippingSubdivisions.length === 0 ||
      shippingOptions.length === 0
    )
      setLoading(true);
    else setLoading(false);
  }, [shippingCountries, shippingSubdivisions, shippingOptions]);

  const handleEmailValidation = (email) => isValidEmail(email);

  return (
    <>
      <div className="h5 mt-4">Shipping Address</div>
      <form
        onSubmit={handleSubmit((values) =>
          handleNextStep({
            ...values,
            shippingCountry,
            shippingSubdivision,
            shippingOption,
          })
        )}>
        <div className="form-row mt-3">
          <div className="form-group col-md-6">
            <FormField
              label="First Name"
              error={errors.firstName && errors.firstName.message}>
              <Input
                variant="flushed"
                placeholder="John"
                {...register('firstName', { required, minLength })}
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
                {...register('lastName', { required, minLength })}
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
                {...register('address', { required, maxLength })}
              />
            </FormField>
          </div>
          <div className="form-group col-md-6">
            <FormField
              label="Email"
              error={
                (errors.email &&
                  errors.email.type === 'required' &&
                  errors.email.message) ||
                (errors.email &&
                  errors.email.type === 'validate' &&
                  'Enter valid email.')
              }>
              <Input
                variant="flushed"
                placeholder="john@example.com"
                {...register('email', {
                  required,
                  validate: handleEmailValidation,
                })}
              />
            </FormField>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <FormField label="City" error={errors.city && errors.city.message}>
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

        {loading ? (
          <Loading label="Loading Shipping Options..." />
        ) : (
          <>
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
          </>
        )}

        <div className="d-flex justify-content-between mt-3">
          <Link to="/cart">
            <Button>
              <HiOutlineArrowNarrowLeft className="mr-1" /> Back to Cart
            </Button>
          </Link>
          <Button isDisabled={loading} type="submit" colorScheme="messenger">
            Next <HiOutlineArrowNarrowRight className="ml-1" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
