import React from "react"

import classes from "./Button.module.css"

//util
import colours from "../../../../Util/Colours"

const Button = props => {

    return (

        <div className={classes.container} onClick={props.onClick} style={{backgroundColor:colours.blue, boxShadow:`1px 1px 2px 1px ${colours.dark_blue}`}}>

            <span className={classes.text}>{props.text}</span>

        </div>

    )

}

export default Button