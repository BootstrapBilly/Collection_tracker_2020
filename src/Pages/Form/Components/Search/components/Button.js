import React from 'react'

import classes from "./Button.module.css"

export const Button = props => {

    return (

        <div className={classes.container}>

            <img src={props.src} alt={"A button"} className={classes.icon}/>
            <span className={classes.text}>{props.text}</span>
            
        </div>

    )

}

export default Button
