import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function changeRequestsList({ changeRequests }) {
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
      </TableRow>
    );
  }

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 650, border: '1px' }}
        size="small"
        aria-label="simple table"
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
          </TableRow>
        </TableHead>
        <TableBody>
          {changeRequests.length > 0 &&
            changeRequests?.map(renderChangeRequests)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}