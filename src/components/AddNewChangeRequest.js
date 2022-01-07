import { Alert, Grid, InputLabel, Snackbar } from '@mui/material';
import { useContext, useState } from 'react';

import { API } from '../constants/constants';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { UserContext } from '../config/userContext';
import { getData } from '../services/changeRequests';

export default function AddNewChangeRequest() {
  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { user } = useContext(UserContext);

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
      requesterName: userInput.get('requesterName'),
      requestedDate: userInput.get('requestedDate'),
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
            <Grid container spacing={2} rowSpacing={3}>
              <Grid item>
                <InputLabel id="requester-name-label">
                  Requester Name:
                </InputLabel>
                <TextField
                  id="requester-name-input-id"
                  name="requesterName"
                  variant="outlined"
                  size="small"
                  value={user}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} rowSpacing={3}>
              <Grid item>
                <InputLabel id="request-id">Requested Date: </InputLabel>
                <TextField
                  id="request-id-input"
                  name="requestedDate"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>

            <InputLabel id="request-id">Change Request Type: </InputLabel>
            <TextField
              id="request-id-input"
              name="changeRequestType"
              variant="outlined"
              size="small"
            />

            <InputLabel id="request-id">Change Request Description:</InputLabel>
            <TextField
              id="request-id-input"
              name="changeRequestDescription"
              variant="outlined"
              size="small"
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
