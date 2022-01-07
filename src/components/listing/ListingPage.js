import {
  Button,
  Container,
  CssBaseline,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { API } from '../../config/constants';
import AddNewChangeRequest from '../addNewChangeRequest/AddNewChangeRequest';
import BackDrop from '../common/BackDrop';
import Box from '@mui/material/Box';
import BoxItem from '../common/BoxItem';
import Header from '../common/Header';
import ListChangeRequests from './ListChangeRequests';
import { getData } from '../../services/fetchApi';

export default function ListingPage() {
  const [requestId, setRequestId] = useState('');
  const [owner, setOwner] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getData(API.FETCH_CHANGE_REQUESTS)
      .then((data) => {
        if (data && data.change_request.length > 0) {
          let filteredData = data?.change_request.sort(
            (a, b) => new Date(a.date_submitted) - new Date(b.date_submitted)
          );
          setData(filteredData);
        }
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  if (error) throw error;

  const clearFilters = () => {
    setRequestId('');
    setOwner('');
  };

  const handleSerach = () => {
    if (requestId || owner) {
      let filteredData = data?.filter((request) => {
        return (
          request.request_id === requestId ||
          request.owner.toUpperCase() === owner.toUpperCase()
        );
      });
      setData(filteredData);
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Header />
      <div>
        <Box sx={{ display: 'flex', p: 0, m: 0 }}>
          <BoxItem>
            <Typography variant="h6" gutterBottom component="div">
              Change Requests
            </Typography>
          </BoxItem>
        </Box>
        <Box sx={{ display: 'flex', p: 0, m: 0 }}>
          <BoxItem>
            <InputLabel id="request-id">Request ID</InputLabel>
            <TextField
              id="request-id-input"
              variant="outlined"
              size="small"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
            />
          </BoxItem>
          <BoxItem>
            <InputLabel id="owner">Owner</InputLabel>
            <TextField
              id="owner-input"
              variant="outlined"
              size="small"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </BoxItem>
        </Box>
        <Box sx={{ display: 'flex', textAlign: 'right' }}>
          <BoxItem>
            <Button color="primary" size="small" onClick={clearFilters}>
              Clear Filters
            </Button>
          </BoxItem>
          <BoxItem>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleSerach}
            >
              Search
            </Button>
          </BoxItem>
          <BoxItem sx={{ flexGrow: 1 }}>
            <AddNewChangeRequest />
          </BoxItem>
        </Box>
      </div>

      {!loading && data.length > 0 ? (
        <ListChangeRequests changeRequests={data} />
      ) : (
        <BackDrop />
      )}
    </Container>
  );
}
