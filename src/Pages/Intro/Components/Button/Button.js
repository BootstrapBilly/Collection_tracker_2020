import React from "react"

import classes from "./Button.module.css"

const Button = props => {

    return (

        <div className={classes.container} onClick={props.onClick}>

            <span className={classes.text}>{props.text}</span>

        </div>

    )

}

export default Button