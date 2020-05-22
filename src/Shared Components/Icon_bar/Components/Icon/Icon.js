import React from 'react'

import classes from "./Icon.module.css"

import colours from "../../../../Util/Colours"

export const Icon = props => {


    return (

        <div className={classes.container} style={{ borderColor: props.active_icon === props.type && colours.blue, zIndex:props.apply_tutorial ?  "90000000000" : "0"}}>

            <div className={classes.tutorial_overlay} style={{display:props.apply_tutorial ? "block" : "none", color:colours.dark_blue}}></div>

            <img src={props.src} alt={props.alt} className={classes.icon}
                onClick={props.tutorial_overlay ? null : props.handle_icon_click} 
                
            />

            <span className={classes.text} style={{color: props.active_icon === props.type ? colours.blue : colours.grey}}>{props.text}</span>

        </div>

    )

}

export default Icon