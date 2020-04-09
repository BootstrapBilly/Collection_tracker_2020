import React, {useState} from 'react';

import './App.css';

//pages
import Intro from "./Pages/Intro/Intro"

const App = () => {

  const [intro_page, set_intro_page] = useState(1)

  return (

    <div className="App">

      <Intro page={intro_page} handle_button_click={(page)=> page === 1 ? set_intro_page(2) : set_intro_page(1) } />

    </div>

  );
}

export default App;
