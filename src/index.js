import React from 'react';
import App from './components/App.js';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer.js';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)