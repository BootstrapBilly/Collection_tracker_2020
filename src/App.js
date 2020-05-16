import React, {useState} from 'react';

import './App.css';

//pages
import Dashboard from "./Pages/Dashboard/Dashboard"
import Form from "./Pages/Form/Form"

//components
import Tutorial from "./Shared Components/First_tutorial/First_tutorial"

//external
import { BrowserRouter, Switch, Route } from "react-router-dom"

//functions
import handle_tutorial_completion from "./Util/Handle_tutorial_completion"

const App = () => {

  const [tutorial_completed, set_tutorial_completed] = useState(window.localStorage.getItem("first_tutorial_completed"))//initialise the state with the local storage variable

  return (

        <div className="App">

          <BrowserRouter>

          {tutorial_completed ? //If the tutorial is completed, display the app

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

            : //Otherwise display the tutorial
            
            <Tutorial handle_completion={()=> handle_tutorial_completion("first", null, set_tutorial_completed)}/>
            
            }

          </BrowserRouter>

        </div>

        

  

      




  );
}

export default App;
