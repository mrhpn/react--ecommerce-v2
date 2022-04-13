import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import InputText from './inputText';
import shipping from '../services/shipping';
import checkout from '../services/checkout';
import { Link } from 'react-router-dom';

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
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

  return (
    <>
      <Typography variant="h6">Shopping Address</Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
          className="mb-5">
          <Grid container spacing={3}>
            <InputText name="firstName" label="First Name" />
            <InputText name="lastName" label="Last Name" />
            <InputText name="address1" label="Address" />
            <InputText name="email" label="Email" />
            <InputText name="city" label="City" />
            <InputText name="zip" label="Zip / Postel Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                variant="standard"
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((Subdivision) => (
                  <MenuItem key={Subdivision.id} value={Subdivision.id}>
                    {Subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                variant="standard"
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                variant="standard"
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div className="d-flex justify-content-between">
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
