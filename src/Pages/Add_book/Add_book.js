import React, {useState} from "react"

import classes from "./Add_book.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"


const Add_book = props => {

    //*states
    const [input_focus, set_input_focus] = useState(false)

    return (

        <div className={classes.container}>

            <Form title="Add Book" button_text="Add Book" onFocus={()=> set_input_focus(true)} onBlur={()=> set_input_focus(false)} keyboard_active={input_focus}/>

            <OptionsBar path={props.location.pathname} />

        </div>
    )

}

export default Add_book