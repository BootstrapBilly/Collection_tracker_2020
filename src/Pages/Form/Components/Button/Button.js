import React from 'react'

import classes from "./Button.module.css"

//util
import colours from "../../../../Util/Colours"

export const Button = props => {

    const handle_display = () => {

        if (props.type === "back") {//if its a back button

            if (props.current_step === "year") return "none" //and the step is year, do not display it

        }

        else switch (props.current_step) {//otherwise if its a next button

            case "year"://if form step is year
                if (props.year && props.year.length === 4) return "block";//and the year input is 4 characters long, display the next button
                else return "none"

            case "condition"://if the form step is condition
                if (props.selected_condition) return "block";//display the next button if a condition is selected
                else return "none"

            default:
                return "block"
        }

    }

    return (

        <button

            test_handle={props.test_handle}

            className={props.overwrite_class ? props.overwrite_class : classes.button}

            style={{

                display: handle_display(), //decides whether to display the next button, against criteria (line 10)
                backgroundColor: props.type === "back" ? "none" : colours.dark_blue, //set the background colour based on the type of button
                border: props.type === "back" ? `2px solid ${colours.dark_blue}` : "#f8f8ff", //set the border  based on the type of button
                color: props.type === "back" ? colours.dark_blue : "white" //set the text colour based on the type of button

            }}

            onClick={props.onClick}

        >

            {
                props.type === "back" ? props.text //if its a back button, text is passed in via props
                    : props.current_step === "year" || props.current_step === "condition" ? "Next"// If the step is year or condition, its a next button 
                        : props.text //otherwise its the text passed in via props
            }

        </button>

    )

}

export default Button