import React from "react"

import classes from "./Button.module.css"

import colours from "../../../../Util/Colours"

const Button = props => {

    return (

        <div className={classes.container} style={{
            
            backgroundColor:!props.grey ? colours.blue : colours.grey,

            boxShadow: `1px 1px 2px 1px ${!props.grey ? colours.dark_blue : colours.dark_grey}`, 

            color:  "white" }}

            onClick={props.handle_submit}
            
            >

            {props.text}

        </div>
    )

}

export default Button