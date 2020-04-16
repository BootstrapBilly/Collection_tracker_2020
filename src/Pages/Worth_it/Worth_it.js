import React, { useState, useEffect } from "react"

import classes from "./Worth_it.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"
import DesktopForm from "../../Shared Components/Desktop_form/Desktop_form"

//external
import { useAlert } from 'react-alert'

//redux hooks
import { useSelector, useDispatch } from "react-redux"

//redux action creators
import {worth_it_inquiry_action} from "../../Store/Actions/Worth_it_action"


const Worth_it = props => {

    //-config
    const dispatch = useDispatch()
    const alert = useAlert()

    //*states
    const [input_focus, set_input_focus] = useState(false)
    const [selected_condition, set_selected_condition] = useState(null)//defines which condition button is selected
    const [input, set_input] = useState("")//holds the value from the input component (used to change the colour of the button once populated)

    //?selectors
    const inquiry_result = useSelector(state => state.worth.inquiry_result)
    const error = useSelector(state => state.worth.error)

    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    //_functions
    const handle_submit = () => {

        console.log(selected_condition)
        console.log(input)

        if (!selected_condition) return alert.show('Please select a condition', { type: "error" })

        if (input.length !== 4) return alert.show('Please enter a year between 1950-2020', { type: "error" })

        else dispatch(worth_it_inquiry_action({year: input, condition: selected_condition}))

    }

    const handle_input = e => set_input(e.target.value)

    //!Effects
    useEffect(() => {

        if (inquiry_result) {
            alert.show(`${inquiry_result.reason}  ${inquiry_result.result} `, { type: "success" })
            set_input("")
        }

        if (error) alert.show(error, { type: "error" })
        // eslint-disable-next-line
    }, [inquiry_result, error])

    return (

        <div className={classes.container}>

            <div className={classes.container}>

                {width < 1200 || (height === 954 && width === 1366) ?

                    <Form
                        title="Buy it ?"
                        button_text="FIND OUT"
                        onFocus={() => set_input_focus(true)}
                        onBlur={() => set_input_focus(false)}
                        keyboard_active={input_focus}
                        handle_submit={() => handle_submit()}
                        handle_change={e => handle_input(e)}
                        value={input}
                        selected_condition={selected_condition}
                        set_selected_condition={condition => set_selected_condition(condition)}
                        grey
                    /> :

                    <DesktopForm
                        title="SHOULD I BUY IT ?"
                        button_text="FIND OUT"
                        handle_submit={() => handle_submit()}
                        handle_change={e => handle_input(e)}
                        value={input}
                        selected_condition={selected_condition}
                        set_selected_condition={condition => set_selected_condition(condition)}
                        grey
                    />}


                <OptionsBar path={props.location.pathname} />

            </div>

        </div>

    )

}

export default Worth_it