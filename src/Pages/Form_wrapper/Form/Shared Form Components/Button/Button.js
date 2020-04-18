import React from "react"

import classes from "./Button.module.css"

import colours from "../../../../../Util/Colours"

const Button = props => {

    return (

        <div className={classes.container} style={{
            
            backgroundColor:colours.blue ,

            boxShadow: `1px 1px 2px 1px ${colours.dark_blue}`, 

            color:  "white" }}

            onClick={props.handle_submit}
            
            >

            {props.text}

        </div>
    )

}

export default Button