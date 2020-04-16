import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"
import {Provider} from "react-redux"

import intro_reducer from "./Store/Reducers/intro_reducer"
import add_book_reducer from "./Store/Reducers/Add_book_reducer"
import find_book_reducer from "./Store/Reducers/Find_book_reducer"

const rootReducer = combineReducers({ //combine all the state reducers into one root reducer

  intro: intro_reducer,
  add: add_book_reducer,
  find: find_book_reducer,

})


const store = createStore(rootReducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
