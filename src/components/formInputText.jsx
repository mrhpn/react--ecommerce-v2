import React from 'react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

const FormField = ({ error, children, label }) => {
  return (
    <FormControl isRequired isInvalid={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormField;
