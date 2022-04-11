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

const AddressForm = ({ checkoutToken }) => {
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

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(
    shippingSubdivisions
  ).map(([code, name]) => ({ id: code, label: name }));

  return (
    <>
      <Typography variant="h6">Shopping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit="" className="mb-5">
          <Grid container spacing={3}>
            <InputText required={true} name="firstName" label="First Name" />
            <InputText required={true} name="lastName" label="Last Name" />
            <InputText required={true} name="address" label="Address" />
            <InputText required={true} name="email" label="Email" />
            <InputText required={true} name="city" label="City" />
            <InputText required={true} name="zip" label="Zip / Postel Code" />
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
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={3} fullWidth onChange="">
                <MenuItem key={} value={}>
                  Apple
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
