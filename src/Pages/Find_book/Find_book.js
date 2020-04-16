import React, { useState, useEffect } from "react"

import classes from "./Find_book.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"
import DesktopForm from "../../Shared Components/Desktop_form/Desktop_form"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { find_book_action } from "../../Store/Actions/Find_book_action"

//external
import { useAlert } from 'react-alert'

const Find_book = props => {

    //-config
    const dispatch = useDispatch()
    const alert = useAlert()
    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    //*states
    const [input_focus, set_input_focus] = useState(false)
    const [input, set_input] = useState("")//holds the value from the input component (used to change the colour of the button once populated)

    //?selectors
    const last_book_found = useSelector(state => state.find.search_result)
    const error = useSelector(state => state.find.error)

    //__functions
    const handle_input = e => set_input(e.target.value)

    const handle_submit = () => {

        if (input.length !== 4) return alert.show('Please enter a year between 1950-2020', { type: "error" })

        else dispatch(find_book_action(input))

    }

    //!Effects
    useEffect(() => {

        if (last_book_found) {
            alert.show(`${last_book_found.year} in ${last_book_found.condition} was found`, { type: "success" })
            set_input("")
        }

        if (error) alert.show(error, { type: "error" })
        // eslint-disable-next-line
    }, [last_book_found, error])

    return (


        <div className={classes.container}>

            {width < 1200 || (height === 954 && width === 1366) ?

                <Form
                    title="Find Book"
                    button_text="FIND BOOK"
                    onFocus={() => set_input_focus(true)}
                    onBlur={() => set_input_focus(false)}
                    keyboard_active={input_focus}
                    handle_submit={() => handle_submit()}
                    handle_change={e => handle_input(e)}
                    value={input}
                    hidden
                /> :

                <DesktopForm
                    title="FIND A BOOK"
                    button_text="FIND BOOK"
                    handle_submit={() => handle_submit()}
                    handle_change={e => handle_input(e)}
                    value={input}
                    hidden
                />}
            {/* 
            {width < 1200 || (height === 954 && width === 1366) ?

                <Form title="Find Book" button_text="FIND BOOK" onFocus={() => set_input_focus(true)} onBlur={() => set_input_focus(false)} keyboard_active={input_focus} hidden /> :

                <DesktopForm title="FIND A BOOK" button_text="FIND BOOK" hidden />} */}

            <OptionsBar path={props.location.pathname} />

        </div>

    )

}

export default Find_book