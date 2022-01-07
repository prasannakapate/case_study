import { Route, Routes } from 'react-router-dom';

import { lazy } from 'react';

const LoginPage = lazy(() => import('./components/login/LoginPage'));
const ListingPage = lazy(() => import('./components/listing/ListingPage'));
const NoMatch = lazy(() => import('./components/common/NoMatch'));

function App() {
  return (
    <Routes>
      <Route index path="/" element={<LoginPage />} />
      <Route path="/listing" element={<ListingPage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
