import React from "react"

import classes from "./Condition_circle.module.css"

const Condition_circle = props => {

    return (

        <div className={classes.container} style={{ backgroundColor: props.background_colour }}>

            <div className={classes.inner_container} style={{color:props.text_colour, backgroundColor:props.inner_background_colour}} onMouseDown={props.onClick} onTouchStart={props.onClick}>{props.text}</div>
            
            <div className={classes.animation_container} style={{display:props.display, backgroundColor: props.background_colour, color:props.text_colour}}>{props.text}</div>

        </div>

    )

}

export default Condition_circle