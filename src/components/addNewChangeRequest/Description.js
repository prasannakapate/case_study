import { InputLabel, TextareaAutosize } from '@mui/material';

import React from 'react';

export default function Description() {
  return (
    <>
      <InputLabel id="request-id">Change Request Description:</InputLabel>
      <TextareaAutosize
        aria-label="request-id"
        minRows={6}
        id="request-id-input"
        name="changeRequestDescription"
        style={{ width: '100%' }}
      />
    </>
  );
}
