import React from 'react';

import './App.css';

//pages
import Dashboard from "./Pages/Dashboard/Dashboard"
import Form from "./Pages/Form/Form"


//external
import { BrowserRouter, Switch, Route } from "react-router-dom"

const App = () => {

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

            <Route path="/worth_it" exact

              component={

                () =>

                  <Form path="/worth_it" title="SHOULD I BUY IT?" background_name="worth" type="Worth" />

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
