import React from 'react'

import classes from "./Button.module.css"

//util
import colours from "../../../../../Util/Colours"

export const Button = props => {

    return (

        <button

            className={classes.form_button}

            style={{ backgroundColor: props.year && props.year.length === 4 ? colours.dark_blue : colours.dark_grey }}

            onClick={props.onClick}>

            {props.current_step === "year" ? "Next" : props.current_step === "Add Book"}

        </button>

    )

}

export default Button