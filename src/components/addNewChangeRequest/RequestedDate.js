import { DatePicker, LocalizationProvider } from '@mui/lab';
import { InputLabel, TextField } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';

export default function RequestedDate({ date, setDate }) {
  return (
    <>
      <InputLabel id="request-id">Requested Date: </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disablePast
          name="requestedDate"
          views={['day']}
          value={date}
          onChange={(newValue) => {
            setDate(moment(new Date(newValue)).format('DD/MM/YYYY'));
          }}
          renderInput={(params) => <TextField {...params} />}
          size="small"
        />
      </LocalizationProvider>
    </>
  );
}
