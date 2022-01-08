import { InputLabel, TextField } from '@mui/material';

import React from 'react';

export default function ChangeRequestType() {
  return (
    <>
      <InputLabel id="request-id">Change Request Type: </InputLabel>
      <TextField
        id="request-id-input"
        name="changeRequestType"
        variant="outlined"
        size="small"
        style={{ width: '100%' }}
      />
    </>
  );
}
