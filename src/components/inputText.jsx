import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const InputText = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        label={label}
        required={true}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            variant="standard"
            onChange={onChange}
            value={value}
            label={label}
            required={true}
          />
        )}
        rules={{ required: true }}
      />
    </Grid>
  );
};

export default InputText;
