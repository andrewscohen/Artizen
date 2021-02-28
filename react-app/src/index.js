import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';
import {LoadScript} from '@react-google-maps/api';

const libraries = ["places"]
const store = configureStore();

function Root() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY} libraries={libraries}>
      <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </ReduxProvider>
    </LoadScript>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
