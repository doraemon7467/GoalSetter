// Import necessary modules from React and ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// Import the Redux store configuration from './app/store'
import { store } from './app/store';

// Import the main App component
import App from './App';

// Import the CSS file for styling
import './index.css';

// Get the DOM element with the id 'root'
const container = document.getElementById('root');

// Create a root using createRoot method from ReactDOM
const root = createRoot(container);

// Render the entire application
root.render(
  // Use StrictMode to highlight potential issues in the app
  <React.StrictMode>
    <Provider store={store}>
      <App />
     </Provider>  { /*//  providing the Redux store to the entire app using Provider */}
  </React.StrictMode>
);

