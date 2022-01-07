import { Alert, InputLabel, Snackbar, TextareaAutosize } from '@mui/material';

import { API } from '../../config/constants';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { getData } from '../../services/fetchApi';
import { selectUser } from '../../feature/userSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function AddNewCR() {
  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [date, setDate] = useState(new Date());
  const user = useSelector(selectUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInput = new FormData(event.currentTarget);
    console.log({
      requesterName: user?.name,
      requestedDate: date,
      changeRequestType: userInput.get('changeRequestType'),
      changeRequestDescription: userInput.get('changeRequestDescription'),
    });

    async function fetchData() {
      try {
        const response = await getData(API.SUBMIT_CR);
        if (response.status === 'SUCCESS') setShowSnackbar(true);
      } catch (err) {
        console.error('API Failure:', err);
      } finally {
        setTimeout(() => {
          handleClose();
          setShowSnackbar(false);
        }, 3000);
      }
    }

    fetchData();
  };

  return (
    <div>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Add New CR
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogTitle>Add a New Change Request</DialogTitle>
          <DialogContent>
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

            <InputLabel id="request-id">Change Request Type: </InputLabel>
            <TextField
              id="request-id-input"
              name="changeRequestType"
              variant="outlined"
              size="small"
              style={{ width: '100%' }}
            />

            <InputLabel id="request-id">Change Request Description:</InputLabel>
            <TextareaAutosize
              aria-label="request-id"
              minRows={6}
              id="request-id-input"
              name="changeRequestDescription"
              style={{ width: '100%' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} size="small" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" size="small" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {showSnackbar && (
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert severity="success">
            Change Request submitted successfully
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
