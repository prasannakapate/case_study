import { InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { API } from '../../config/constants';
import { getData } from '../../services/fetchApi';

export default function ChangeRequestType({ requestType, setRequestType }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData(API.FETCH_CR_TYPE)
      .then((data) => {
        setData(data.change_request_type);
      })
      .catch((e) => setError(e));
  }, []);

  const handleChange = (event) => {
    setRequestType(event.target.value);
  };

  if (error) throw error;

  return (
    <>
      <InputLabel id="request-id">Change Request Type: </InputLabel>
      <Select
        labelId="request-id-input-label"
        id="demo-simple-select"
        name="changeRequestType"
        size="small"
        value={requestType}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        {data.length > 0 &&
          data.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
      </Select>
    </>
  );
}
