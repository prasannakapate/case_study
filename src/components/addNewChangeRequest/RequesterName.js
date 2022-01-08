import { InputLabel, TextField } from '@mui/material';

import React from 'react';

export default function RequesterName({ user }) {
  return (
    <div>
      <InputLabel id="requester-name-label">Requester Name:</InputLabel>
      <TextField
        id="requester-name-input-id"
        name="requesterName"
        variant="outlined"
        size="small"
        value={user?.name}
        style={{ width: '100%' }}
        disabled
      />
    </div>
  );
}
