import React from "react"
import classes from "./Option.module.css"

const Option = props => {

    return (
            
            <img className={classes.icon} src={props.src} alt={props.alt} />

    )

}

export default Option