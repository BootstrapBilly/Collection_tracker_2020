import React, {useState} from "react"

import classes from "./Find_book.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"
import DesktopForm from "../../Shared Components/Desktop_form/Desktop_form"

const Find_book = props => {

    //*states
    const [input_focus, set_input_focus] = useState(false)

    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    return (


        <div className={classes.container}>

            {width < 1200 || (height === 954 && width === 1366) ?

                <Form title="Find Book" button_text="FIND BOOK" onFocus={() => set_input_focus(true)} onBlur={() => set_input_focus(false)} keyboard_active={input_focus} hidden /> :

                <DesktopForm title="FIND A BOOK" button_text="FIND BOOK" hidden />}

            <OptionsBar path={props.location.pathname} />

        </div>

    )

}

export default Find_book