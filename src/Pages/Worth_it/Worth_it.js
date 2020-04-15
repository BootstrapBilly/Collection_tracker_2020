import React, {useState} from "react"

import classes from "./Worth_it.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"
import DesktopForm from "../../Shared Components/Desktop_form/Desktop_form"

const Worth_it = props => {

        //*states
        const [input_focus, set_input_focus] = useState(false)

        const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    return (

        <div className={classes.container}>

            <div className={classes.container}>

                {width < 1200 || (height === 954 && width === 1366) ?

                    <Form title="Buy it ?" button_text="FIND OUT" onFocus={() => set_input_focus(true)} onBlur={() => set_input_focus(false)} keyboard_active={input_focus} grey /> :

                    <DesktopForm title="SHOULD I BUY IT ?" button_text="FIND OUT" grey />}

                <OptionsBar path={props.location.pathname} />

            </div>

        </div>

    )

}

export default Worth_it