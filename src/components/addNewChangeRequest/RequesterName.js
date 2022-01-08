import { InputLabel, TextField } from '@mui/material';

import React from 'react';

export default function RequesterName({ user, setUser }) {
  return (
    <div>
      <InputLabel id="requester-name-label">Requester Name:</InputLabel>
      <TextField
        id="requester-name-input-id"
        name="requesterName"
        variant="outlined"
        size="small"
        value={user}
        onChange={(event) => setUser(event.target.value)}
        style={{ width: '100%' }}
      />
    </div>
  );
}
