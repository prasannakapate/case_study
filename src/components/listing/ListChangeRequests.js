import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ListChangeRequests({
  changeRequests,
  setOpenConfirmation,
  setSelectedChangeRequest,
}) {
  const handleConfirmation = (status, requestId) => {
    setOpenConfirmation(true);
    setSelectedChangeRequest({ status, requestId });
  };

  function renderChangeRequests(request) {
    return (
      <TableRow
        key={request.request_id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{request.request_id}</TableCell>
        <TableCell>{request.territory_id}</TableCell>
        <TableCell>{request.submitted_by}</TableCell>
        <TableCell>{request.owner}</TableCell>
        <TableCell>{request.request_type}</TableCell>
        <TableCell>{request.status}</TableCell>
        <TableCell>{request.date_submitted}</TableCell>
        {request.isNew && (
          <TableCell>
            <IconButton
              aria-label="approve"
              color="success"
              onClick={() => handleConfirmation('approve', request.request_id)}
            >
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              aria-label="reject"
              color="error"
              onClick={() => handleConfirmation('reject', request.request_id)}
            >
              <CancelIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    );
  }

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 650, border: '1px' }}
        size="small"
        aria-label="listing table"
      >
        <TableHead sx={{ background: 'lightgrey' }}>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Territory ID</TableCell>
            <TableCell>Submitted By</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Request Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date Submitted</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {changeRequests.length > 0 ? (
            changeRequests?.map(renderChangeRequests)
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={8}>
                <p>Sorry, no matching records found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
