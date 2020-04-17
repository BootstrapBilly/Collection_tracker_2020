import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//external
import { createStore, combineReducers, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { Provider } from "react-redux"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

//Reducers
import submit_form_reducer from "./Store/Reducers/Submit_form_reducer"

//-Config
const rootReducer = combineReducers({result: submit_form_reducer})

//Alert options
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

ReactDOM.render(

  <React.StrictMode>

    <Provider store={store}>

      <AlertProvider template={AlertTemplate} {...options}>

        <App />

      </AlertProvider>

    </Provider>

  </React.StrictMode>,

  document.getElementById('root')

);

serviceWorker.unregister();
