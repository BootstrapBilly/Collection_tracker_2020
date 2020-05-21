import React from 'react'

import classes from "./Icon.module.css"

import colours from "../../../../Util/Colours"

export const Icon = props => {


    return (

        <div className={classes.container} style={{ borderColor: props.active_icon === props.type && colours.blue}}>

            <img src={props.src} alt={props.alt} className={classes.icon}
                onClick={props.handle_icon_click} 
                
            />

            <span className={classes.text} style={{color: props.active_icon === props.type ? colours.blue : colours.grey}}>{props.text}</span>

        </div>

    )

}

export default Icon