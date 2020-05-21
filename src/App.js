import React from 'react';

import './App.css';

//pages
import Dashboard from "./Pages/Dashboard/Dashboard"
import Form from "./Pages/Form/Form"
import Grid from "./Pages/Grid/Grid"
import Donut from "./Pages/Donut/Donut"

//external
import { Switch, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"


const App = () => {

  const location = useLocation()

  const routes = //define the routes of the application
  
  <Switch location={location} key={location.pathname}>

    <Route path="/" exact component={

      () =>

        <Grid path="/" active={"grid"} />

    } />

    <Route path="/donut" component={

      () =>

        <Donut path="/donut" active={"donut"} />

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

  return (

    <div className="App">

      {
        window.innerWidth >= 1200 ? //on desktop devices

          <AnimatePresence exitBeforeEnter> {/* Display the page transition provider */}

            {[routes] /* Then the routes of the application */}

          </AnimatePresence>

          : // Otherwise, only display the routes with standard transitions (smaller than 1200px width)

          [routes] 
      }

    </div>

  );

}

export default App;
