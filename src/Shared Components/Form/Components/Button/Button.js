import React from "react"

import classes from "./Button.module.css"

import colours from "../../../../Util/Colours"

const Button = props => {

    return (
        <div className={classes.container} style={{
            
            backgroundColor:props.ready_to_submit ? colours.blue : colours.grey, 
            boxShadow: `1px 1px 2px 1px ${props.ready_to_submit ? colours.dark_blue : colours.dark_grey}`, 
            color: props.ready_to_submit ? "white" : colours.blue}}>

            {props.text}

        </div>
    )

}

export default Button