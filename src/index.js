import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//external
import { createStore, combineReducers, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

//Reducers
import submit_form_reducer from "./Store/Reducers/Submit_form_reducer"
import fetch_books_reducer from "./Store/Reducers/Fetch_books_reducer"
import handle_photo_upload_reducer from "./Store/Reducers/Photo_upload_handler_reducer"
import tutorial_reducer from "./Store/Reducers/Tutorial_reducer"
//-Config
const rootReducer = combineReducers({

  result: submit_form_reducer,
  fetch: fetch_books_reducer,
  upload: handle_photo_upload_reducer,
  tutorial: tutorial_reducer

})


const store = createStore(rootReducer, applyMiddleware(reduxThunk));

ReactDOM.render(

  <React.StrictMode>

    <Provider store={store}>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </Provider>

  </React.StrictMode>,

  document.getElementById('root')

);

