import { DatePicker, LocalizationProvider } from '@mui/lab';
import { InputLabel, TextField } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function RequestedDate({ date, setDate }) {
  return (
    <>
      <InputLabel id="request-id">Requested Date: </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disableFuture
          name="requestedDate"
          openTo="year"
          views={['year', 'month', 'day']}
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          size="small"
        />
      </LocalizationProvider>
    </>
  );
}
