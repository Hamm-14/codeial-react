import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import { configureStore } from './store';

const store = configureStore();

console.log('store', store);
console.log('state', store.getState());

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
