import { Alert, Snackbar } from '@mui/material';

import { API } from '../../config/constants';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import ChangeRequestType from './ChangeRequestType';
import Description from './Description';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RequestedDate from './RequestedDate';
import RequesterName from './RequesterName';
import { getData } from '../../services/fetchApi';
import { selectUser } from '../../feature/userSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function AddNewChangeRequest() {
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
            <RequesterName user={user} />
            <RequestedDate date={date} setDate={setDate} />
            <ChangeRequestType />
            <Description />
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
