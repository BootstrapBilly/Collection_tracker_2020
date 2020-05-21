import React, { useState } from 'react';

import './App.css';

//pages
import Dashboard from "./Pages/Dashboard/Dashboard"
import Form from "./Pages/Form/Form"

//components
import Tutorial from "./Shared Components/First_tutorial/First_tutorial"

//external
import { Switch, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

//functions
import handle_tutorial_completion from "./Util/Handle_tutorial_completion"
import { useSelector } from 'react-redux';

const App = () => {

  const location = useLocation()

  const [tutorial_completed, set_tutorial_completed] = useState(window.localStorage.getItem("first_tutorial_completed"))//initialise the state with the local storage variable

  const current_route = useSelector(state => state.active_route.route)

  return (

    <div className="App">



        {tutorial_completed ? //If the tutorial is completed, display the app

          <AnimatePresence exitBeforeEnter>
            
            <Switch location={location} key={location.pathname}>

              <Route path="/" exact component={

                () =>

                  <Dashboard path="/chart" active={"grid"} />

              } />

              <Route path="/donut" component={

                () =>

                  <Dashboard path="/chart" active={"donut"} />

              } />

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

          </AnimatePresence>

          : //Otherwise display the tutorial

          <Tutorial handle_completion={() => handle_tutorial_completion("first", null, set_tutorial_completed)} />

        }

   

    </div>










  );
}

export default App;
