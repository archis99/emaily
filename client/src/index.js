//Data Layer Control
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware());

//store as prop to Provider
ReactDom.render(
    <Provider store={store}><App /></Provider>
    , document.querySelector('#root'));