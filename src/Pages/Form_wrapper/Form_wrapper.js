import React, { useState, useEffect } from "react"

//css
import classes from "./Form_wrapper.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "./Form/Mobile_form/Form"
import DesktopForm from "./Form/Desktop_form/Desktop_form"
import Alurt from "../../Shared Components/Alert/Alert"

//redux hooks
import { useDispatch } from "react-redux"

//functions
import { handle_submit } from "./Functions/handle_submit"
import { handle_user_feedback } from "./Functions/handle_user_feedback"

//redux action creators
import { submit_form, handle_validation_failure, clear_feedback } from "../../Store/Actions/Submit_form_action"

const Other_page = props => {

    //-config
    const dispatch = useDispatch()
    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    const form_submitted = props.on_form_submit

    //*states
    const [keyboard_open, set_keyboard_open] = useState(false)//used to hide the header on mobile devices when they keyboard is active
    const [selected_condition, set_selected_condition] = useState(null)//defines which condition button is selected
    const [entered_year, set_entered_year] = useState("")//holds the user input for the year of book box
    const [alurt, set_alurt] = useState([null, "hidden"])

    //!Effects
    useEffect(() => {

        if (form_submitted) set_alurt(handle_user_feedback(form_submitted.feedback, form_submitted.type))

        // eslint-disable-next-line
    }, [form_submitted])



    return (

        <div className={classes.container}>

            {width < 1200 || (height === 954 && width === 1366) ?

                <Form
                    title={props.title}
                    button_text={props.button_text}
                    onFocus={() => set_keyboard_open(true)}
                    onBlur={() => set_keyboard_open(false)}
                    keyboard_active={keyboard_open}
                    handle_submit={() => handle_submit(selected_condition, entered_year, alert, dispatch, submit_form, handle_validation_failure, props.hidden, props.submission_url)}//imported from another file
                    handle_change={e => set_entered_year(e.target.value)}
                    value={entered_year}
                    selected_condition={selected_condition}
                    set_selected_condition={condition => set_selected_condition(condition)}
                    hidden={props.hidden}
                    worth_it={props.worth_it}
                /> :

                <DesktopForm
                    title={props.desktop_title}
                    button_text={props.button_text}
                    handle_submit={() => handle_submit(selected_condition, entered_year, alert, dispatch, submit_form, handle_validation_failure, props.hidden, props.submission_url)}
                    handle_change={e => set_entered_year(e.target.value)}
                    value={entered_year}
                    selected_condition={selected_condition}
                    set_selected_condition={condition => set_selected_condition(condition)}
                    hidden={props.hidden}
                    worth_it={props.worth_it}
                />}

            <OptionsBar path={props.path} onClick={()=> dispatch(clear_feedback())} />

            {<Alurt message={alurt[0]} type={alurt[1]} />}

        </div>
    )

}

export default Other_page