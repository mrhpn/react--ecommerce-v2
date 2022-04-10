import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const InputText = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            variant="standard"
            onChange={onChange}
            value={value}
            label={label}
          />
        )}
        control={control}
        name={name}
        label={label}
        required={required}
      />
    </Grid>
  );
};

export default InputText;
