import React from 'react'

import classes from './Input.module.css'

//util
import colours from "../../../../Util/Colours"

export const Input = props => {

    return (

            <input type="text" name="year" className={classes.form_input}

                style={{
                    borderColor: props.error ? colours.red : colours.dark_blue,
                    color: props.error ? colours.red : colours.dark_blue,
                    width: props.year && "60px"
                }}

                maxLength="4" placeholder={"Enter year"}

                onChange={props.handle_change}

                value={props.year || ""}

                onFocus={props.onFocus}

                onBlur={props.onBlur}

                test_handle={props.test_handle}

                onKeyDown={props.handle_keydown}
            />

    )

}

export default Input