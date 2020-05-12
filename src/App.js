import React from 'react';

import './App.css';

//pages
import Dashboard from "./Pages/Dashboard/Dashboard"
import Form from "./Pages/Form/Form"

//external
import { BrowserRouter, Switch, Route } from "react-router-dom"

//redux hooks
import {useDispatch} from "react-redux"

//redux action creators
import {mark_completed} from "./Store/Actions/Tutorial_action"

const App = () => {

  const dispatch = useDispatch()

  const tutorial_complete = window.localStorage.getItem("tutorial_complete")

  if(tutorial_complete) dispatch(mark_completed())

  return (

    <div className="App">

        <BrowserRouter>

          <Switch>

            <Route path="/" exact component={Dashboard} />

            <Route path="/add_book" exact
              component={

                () =>

                  <Form path="/add_book" title="ADD A NEW BOOK" background_name="add_book" type="Add" />

              }

            />

            <Route path="/search" exact component={

              () =>

                <Form path="/search" title="SEARCH FOR A BOOK" background_name="search" type="Search" />

            }

            />

          </Switch>

        </BrowserRouter>

      {/* 
        <Intro page={intro_page} handle_button_click={(page) => page === 1 ? set_intro_page(2) : mark_intro_completed()} /> */}

    </div>


  );
}

export default App;
