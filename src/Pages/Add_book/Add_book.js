import React, { useState, useEffect } from "react"

import classes from "./Add_book.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"
import DesktopForm from "../../Shared Components/Desktop_form/Desktop_form"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { add_book_action, clear_last_added_book_action } from "../../Store/Actions/Add_book_action"

//external
import { useAlert } from 'react-alert'

const Add_book = props => {

    //-config
    const dispatch = useDispatch()
    const alert = useAlert()
    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    //*states
    const [input_focus, set_input_focus] = useState(false)
    const [selected_condition, set_selected_condition] = useState(null)//defines which condition button is selected
    const [input, set_input] = useState("")//holds the value from the input component (used to change the colour of the button once populated)

    //?selectors
    const last_book_added = useSelector(state => state.add.last_book_added)
    const error = useSelector(state => state.add.error)

    //_functions
    const handle_submit = () => {

        console.log(selected_condition)
        console.log(input)

        if (!selected_condition) return alert.show('Please select a condition', { type: "error" })

        if (input.length !== 4) return alert.show('Please enter a year between 1950-2020', { type: "error" })

        else dispatch(add_book_action({ year: input, condition: selected_condition }))

    }

    //!Effects
    useEffect(() => {

        if (last_book_added) {
            alert.show(`${last_book_added.year} in ${last_book_added.condition} was added successfully`, { type: "success" })
            set_input("")
            dispatch(clear_last_added_book_action())
        }

        if (error) alert.show(error, { type: "error" })
        // eslint-disable-next-line
    }, [last_book_added, error])


    const handle_input = e => {

        set_input(e.target.value)

    }
    return (

        <div className={classes.container}>

            {width < 1200 || (height === 954 && width === 1366) ?

                <Form
                    title="Add Book"
                    button_text="Add Book"
                    onFocus={() => set_input_focus(true)}
                    onBlur={() => set_input_focus(false)}
                    keyboard_active={input_focus}
                    handle_submit={() => handle_submit()}
                    handle_change={e => handle_input(e)}
                    value={input}
                    selected_condition={selected_condition}
                    set_selected_condition={condition => set_selected_condition(condition)}
                /> :

                <DesktopForm
                    title="ADD A BOOK"
                    button_text="ADD BOOK"
                    handle_submit={() => handle_submit()}
                    handle_change={e => handle_input(e)}
                    value={input}
                    selected_condition={selected_condition}
                    set_selected_condition={condition => set_selected_condition(condition)}
                />}

            <OptionsBar path={props.location.pathname} />

        </div>
    )

}

export default Add_book