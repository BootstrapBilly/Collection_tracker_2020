import React, { useState } from 'react';

import './App.css';

//pages
import Intro from "./Pages/Intro/Intro"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Add_book from "./Pages/Add_book/Add_book"
import Find_book from "./Pages/Find_book/Find_book"
import Worth_it from "./Pages/Worth_it/Worth_it"

//external
import { BrowserRouter, Switch, Route } from "react-router-dom"


const App = () => {

  //-config
  const intro_completed = localStorage.getItem("intro_completed")

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
              <Route path="/add_book" exact component={Add_book} />
              <Route path="/search" exact component={Find_book} />
              <Route path="/worth_it" exact component={Worth_it} />

            </Switch>

          </BrowserRouter>

          :

          <Intro page={intro_page} handle_button_click={(page) => page === 1 ? set_intro_page(2) : mark_intro_completed()} />}

      </div>


  );
}

export default App;
