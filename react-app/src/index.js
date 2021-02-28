import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';
import {LoadScript} from '@react-google-maps/api';


const store = configureStore();

function Root() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}>
          <App />
        </LoadScript>
      </BrowserRouter>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
