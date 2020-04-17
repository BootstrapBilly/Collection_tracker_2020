import React, { useState } from 'react';

import './App.css';

//pages
import Intro from "./Pages/Intro/Intro"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Page from "./Pages/Other_Page/Other_page"

//external
import { BrowserRouter, Switch, Route } from "react-router-dom"

//redux hooks
import { useSelector } from "react-redux"

const App = () => {

  //-config
  const intro_completed = localStorage.getItem("intro_completed")

  //?selectors
  const submission_result = useSelector(state => state.result.submission_result)

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

        <BrowserRouter>

          <Switch>

            <Route path="/" exact component={Dashboard} />

            <Route path="/add_book" exact component={() =>

              <Page path="/add_book" title="Add Book" desktop_title="ADD A BOOK" button_text="ADD BOOK"

                submission_result={{feedback:submission_result, type:"Add"}}
                submission_url={"add_book"}


              />}

            />

            <Route path="/search" exact component={() =>

              <Page path="/search" title="Find Book" desktop_title="FIND A BOOK" button_text="FIND BOOK"
                submission_result={{feedback:submission_result, type:"Search"}}
                submission_url={"search_for_book"}
                hidden



              />}

            />

            <Route path="/worth_it" exact component={() =>

              <Page path="/worth_it" title="Buy it ?" desktop_title="SHOULD I BUY IT?" button_text="FIND OUT"
                submission_result={{feedback:submission_result, type:"Worth"}}
                submission_url={"worth_buying"}
                grey

              />} />

          </Switch>

        </BrowserRouter>

        :

        <Intro page={intro_page} handle_button_click={(page) => page === 1 ? set_intro_page(2) : mark_intro_completed()} />}

    </div>


  );
}

export default App;
