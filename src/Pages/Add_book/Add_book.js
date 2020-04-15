import React, {useState} from "react"

import classes from "./Add_book.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"
import DesktopForm from "../../Shared Components/Desktop_form/Desktop_form"


const Add_book = props => {

    //*states
    const [input_focus, set_input_focus] = useState(false)

    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    console.log(width)
    console.log(height)

    return (

        <div className={classes.container}>

            {width < 1200 || (height=== 954 && width === 1366) ? 

            <Form title="Add Book" button_text="Add Book" onFocus={()=> set_input_focus(true)} onBlur={()=> set_input_focus(false)} keyboard_active={input_focus}/> : 
            
            <DesktopForm title="ADD A BOOK" button_text="ADD BOOK"/>}

            <OptionsBar path={props.location.pathname} />

        </div>
    )

}

export default Add_book