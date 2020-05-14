import React from 'react'

import classes from "./Button.module.css"

//util
import colours from "../../../../Util/Colours"

export const Button = props => {

    console.log(props.selected_condition)
    
    const handle_display = () => {

        if(props.type === "back"){

            if(props.current_step === "year") return "none"
        }

        else switch (props.current_step) {

            case "year":
                if (props.year && props.year.length === 4) return "block";
                else return "none"

            case "condition":
                if (props.selected_condition) return "block";
                else return "none"

            default:
                return "block"
        }
        
    }

    return (

        <button

            test_handle={props.test_handle}

            className={props.overwrite_class ? props.overwrite_class : classes.button}

            style={{display: handle_display(), backgroundColor: props.type === "back" ? "none" : colours.dark_blue, border: props.type === "back" ? `2px solid ${colours.dark_blue}`: "#f8f8ff", color: props.type === "back" ? colours.dark_blue : "white" }}

            onClick={props.onClick}
            
            >

            {props.type === "back" ? props.text : props.current_step === "year" || props.current_step === "condition" ? "Next" : props.text }

            

        </button>

    )

}

export default Button