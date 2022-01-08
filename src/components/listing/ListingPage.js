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
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    getData(API.FETCH_CHANGE_REQUESTS)
      .then((data) => {
        if (data && data.change_request.length > 0) {
          let newData = data?.change_request.sort(
            (a, b) => new Date(a.date_submitted) - new Date(b.date_submitted)
          );
          setData(newData);
          setFilteredData(newData);
        }
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  if (error) throw error;

  const clearFilters = () => {
    setRequestId('');
    setOwner('');
    setFilteredData([...new Set([...data, ...filteredData])]);
  };

  const handleSerach = () => {
    if (requestId || owner) {
      let newData = filteredData?.filter(
        (request) =>
          request.request_id.includes(requestId) &&
          request.owner.toUpperCase().includes(owner.toUpperCase())
      );
      setFilteredData(newData);
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
            <AddNewChangeRequest
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setData={setData}
            />
          </BoxItem>
        </Box>
      </div>

      <ListChangeRequests changeRequests={filteredData} />

      {loading && <BackDrop />}
    </Container>
  );
}
