import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationBox({
  openConfirmation,
  setOpenConfirmation,
  handleConfirmClick,
  selectedChangeRequest,
}) {
  const handleClose = () => {
    setOpenConfirmation(false);
    handleConfirmClick(false);
  };

  return (
    <div>
      <Dialog
        open={openConfirmation}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>
              <strong>Selected Request ID:</strong>
              {selectedChangeRequest.requestId}
            </span>
            <br />
            Do you really want to {selectedChangeRequest.status} this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setOpenConfirmation()}
            size="small"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmClick(true)}
            size="small"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
