import React, { useState } from 'react';

import './App.css';

//pages
import Intro from "./Pages/Intro/Intro"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Other from "./Pages/New_form/Other"

//external
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

//redux action creators
import { add_book_action } from "./Store/Actions/Add_book_action"
import { find_book_action } from './Store/Actions/Find_book_action';
import { worth_it_inquiry_action } from './Store/Actions/Worth_it_action';

//redux hooks
import { useSelector } from "react-redux"



const App = () => {


  //-config
  const intro_completed = localStorage.getItem("intro_completed")

  // optional cofiguration
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

  //?selectors
  const last_book_added = useSelector(state => state.add.last_book_added)
  const add_error = useSelector(state => state.add.error)
  const last_book_found = useSelector(state => state.find.search_result)
  const find_error = useSelector(state => state.find.error)
  const inquiry_result = useSelector(state => state.worth.inquiry_result)
  const inquiry_error = useSelector(state => state.worth.error)

  //*States
  const [intro_page, set_intro_page] = useState(1)

  //_Functions
  const mark_intro_completed = () => {

    localStorage.setItem("intro_completed", true)
    set_intro_page(false)

  };

  return (


    <div className="App">

      {intro_completed ?

        <AlertProvider template={AlertTemplate} {...options}>

          <BrowserRouter>

            <Switch>

              <Route path="/" exact component={Dashboard} />

              <Route path="/add_book" exact component={() =>

                <Other
                  path="/add_book"
                  title="Add Book"
                  desktop_title="ADD A BOOK"
                  button_text="ADD BOOK"
                  action_creator={add_book_action}
                  success_selector={last_book_added}
                  error_selector={add_error}
                  success_message={`${last_book_added.year} ${last_book_added.condition}`}

                />}

              />

              <Route path="/search" exact component={() =>

                <Other
                  path="/search"
                  title="Find Book"
                  desktop_title="FIND A BOOK"
                  button_text="FIND BOOK"
                  action_creator={find_book_action}
                  success_selector={last_book_found}
                  error_selector={find_error}
                  success_message={"Yeah nah search"}
                  hidden

                />}

              />

              <Route path="/worth_it" exact component={() =>

                <Other
                  path="/worth_it"
                  title="Buy it ?"
                  desktop_title="SHOULD I BUY IT?"
                  button_text="FIND OUT"
                  action_creator={worth_it_inquiry_action}
                  success_selector={inquiry_result}
                  error_selector={inquiry_error}
                  success_message={["Yeah nah buyit", "Not worth it"]}
                  grey

                />} />


            </Switch>

          </BrowserRouter>

        </AlertProvider>

        :

        <Intro page={intro_page} handle_button_click={(page) => page === 1 ? set_intro_page(2) : mark_intro_completed()} />}

    </div>


  );
}

export default App;
