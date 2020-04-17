import React, { useState, useEffect } from "react"

//css
import classes from "./Other_page.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"
import DesktopForm from "../../Shared Components/Desktop_form/Desktop_form"

//redux hooks
import { useDispatch } from "react-redux"

//external
import { useAlert } from 'react-alert'

//functions
import { handle_submit } from "./Functions/handle_submit"
import {handle_user_feedback} from "./Functions/handle_user_feedback"

//redux action creators
import {submit_form, clear_feedback} from "../../Store/Actions/Submit_form_action"

const Other_page = props => {

    //-config
    const dispatch = useDispatch()
    const alert = useAlert()
    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window
    const form_submitted = props.submission_result

    //*states
    const [input_focus, set_input_focus] = useState(false)//used to hide the header on mobile devices when they keyboard is active
    const [selected_condition, set_selected_condition] = useState(null)//defines which condition button is selected
    const [input, set_input] = useState("")//holds the value from the input component (used to change the colour of the button once populated)


    //!Effects
    useEffect(() => { 
        
        if(form_submitted.feedback) {
            handle_user_feedback(alert, form_submitted.feedback, form_submitted.type)
            dispatch(clear_feedback())
        }
        // eslint-disable-next-line
    },[form_submitted.feedback])

    return (

        <div className={classes.container}>

            {width < 1200 || (height === 954 && width === 1366) ?

                <Form
                    title={props.title}
                    button_text={props.button_text}
                    onFocus={() => set_input_focus(true)}
                    onBlur={() => set_input_focus(false)}
                    keyboard_active={input_focus}
                    handle_submit={() => handle_submit(selected_condition, input, alert, dispatch, submit_form, props.hidden, props.submission_url)}//imported from another file
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
                    handle_submit={() => handle_submit(selected_condition, input, alert, dispatch, submit_form, props.hidden, props.submission_url)}
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

export default Other_page