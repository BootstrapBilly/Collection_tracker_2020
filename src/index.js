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

//Reducers
import submit_form_reducer from "./Store/Reducers/Submit_form_reducer"

//components
import Alert from "./Shared Components/Alert/Alert"

//-Config
const rootReducer = combineReducers({result: submit_form_reducer})

//Alert options
const options = {
  position: positions.MIDDLE_LEFT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const store = createStore(rootReducer, applyMiddleware(reduxThunk));


ReactDOM.render(

  <React.StrictMode>

    <Provider store={store}>

      <AlertProvider template={Alert} {...options}>

        <App />

      </AlertProvider>

    </Provider>

  </React.StrictMode>,

  document.getElementById('root')

);

serviceWorker.unregister();
