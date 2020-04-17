import React, { useState, useEffect } from "react"

import classes from "./Other.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"
import DesktopForm from "../../Shared Components/Desktop_form/Desktop_form"

//redux hooks
import { useDispatch } from "react-redux"

//external
import { useAlert } from 'react-alert'

//functions
import {handle_submit} from "./Functions/handle_submit"

const Other = props => {

    //-config
    const dispatch = useDispatch()
    const alert = useAlert()
    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    //*states
    const [input_focus, set_input_focus] = useState(false)
    const [selected_condition, set_selected_condition] = useState(null)//defines which condition button is selected
    const [input, set_input] = useState("")//holds the value from the input component (used to change the colour of the button once populated)

    //    //!Effects
       useEffect(() => {

           if (props.success_selector.year) {

               alert.show(props.success_message, { type: "success" })
               set_input("")
           }

           if(props.grey && props.success_selector.reason){
            props.success_selector.result ? alert.show(props.success_message[0], { type: "success" }) : alert.show(props.success_message[1], { type: "error" })
           }

           if (props.error_selector) alert.show(props.error_selector, { type: "error" })
           // eslint-disable-next-line
       }, [props.success_selector, props.error_selector])

    return (

        <div className={classes.container}>

            {width < 1200 || (height === 954 && width === 1366) ?

                <Form
                    title={props.title}
                    button_text={props.button_text}
                    onFocus={() => set_input_focus(true)}
                    onBlur={() => set_input_focus(false)}
                    keyboard_active={input_focus}
                    handle_submit={() => handle_submit(selected_condition, input, alert, dispatch, props.action_creator, props.hidden)}//imported from another file
                    handle_change={e => set_input(e.target.value)}
                    value={input}
                    selected_condition={selected_condition}
                    set_selected_condition={condition => set_selected_condition(condition)}
                    hidden={props.hidden}
                    grey={props.grey}
                /> :

                <DesktopForm
                    title={props.desktop_title}
                    button_text={props.button_text}
                    handle_submit={() => handle_submit(selected_condition, input, alert, dispatch, props.action_creator, props.hidden)}
                    handle_change={e => set_input(e.target.value)}
                    value={input}
                    selected_condition={selected_condition}
                    set_selected_condition={condition => set_selected_condition(condition)}
                    hidden={props.hidden}
                    grey={props.grey}
                />}

            <OptionsBar path={props.path} />

        </div>
    )

}

export default Other