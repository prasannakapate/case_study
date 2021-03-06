import React, { Suspense } from 'react';

import App from './App';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { saveState } from './helper/localStorage';
import { store } from './redux/store';
import throttle from 'lodash/throttle';

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 800)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Router>
            <App />
          </Router>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
