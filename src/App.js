import React from 'react';

import './App.css';

//pages
import Dashboard from "./Pages/Dashboard/Dashboard"
import Page from "./Pages/Form_wrapper/Form_wrapper"
import Form from "./Pages/Form/Form"

//external
import { BrowserRouter, Switch, Route } from "react-router-dom"

//redux hooks
import { useSelector } from "react-redux"

const App = () => {

  //?selectors
  const submission_result = useSelector(state => state.result.submission_result)

  return (

    <div className="App">



        <BrowserRouter>

          <Switch>

            <Route path="/" exact component={Dashboard}/>

            <Route path="/add_book" exact 
            component={Form
              
              //() =>

              // <Page path="/add_book" title="Add Book" desktop_title="ADD A BOOK" button_text="ADD BOOK" submission_url={"add_book"}
              // on_form_submit={submission_result ? {feedback:submission_result, type:"Add"} : null} />
            
            }

            />

            <Route path="/search" exact component={() =>

              <Page path="/search" title="Find Book" desktop_title="FIND A BOOK" button_text="FIND BOOK" submission_url={"search_for_book"} hidden
              on_form_submit={submission_result ? {feedback:submission_result, type:"Search"} : null} />}

            />

            <Route path="/worth_it" exact component={() =>

              <Page path="/worth_it" title="Buy it ?" desktop_title="SHOULD I BUY IT?" button_text="FIND OUT" submission_url={"worth_buying"} worth_it
              on_form_submit={submission_result ? {feedback:submission_result, type:"Worth"} : null} />}
                
            />

          </Switch>

        </BrowserRouter>
        
{/* 
        <Intro page={intro_page} handle_button_click={(page) => page === 1 ? set_intro_page(2) : mark_intro_completed()} /> */}

    </div>


  );
}

export default App;
