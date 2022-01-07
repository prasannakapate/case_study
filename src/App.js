import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserContext } from './config/userContext';

const LoginPage = React.lazy(() => import('./components/LoginPage'));
const ListingPage = React.lazy(() => import('./components/ListingPage'));
const NoMatch = React.lazy(() => import('./components/common/NoMatch'));

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
