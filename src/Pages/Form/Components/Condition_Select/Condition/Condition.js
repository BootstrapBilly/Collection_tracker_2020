import React from 'react'

import classes from "./Condition.module.css"

//util
import colours from "../../../../../Util/Colours"

export const Condition = props => {

    const handle_colour_assignment = () => props.type === "Poor" ? colours.red : props.type === "Fair" ? colours.orange : colours.green

    return (

        <div className={classes.container} style={{ borderColor: props.selected_condition === props.type ? handle_colour_assignment() : "transparent" }}
            onClick={props.on_select_condition.bind(this, props.type)}>

                <div className={classes.circle} test_handle={props.circle_test_handle}>

                    <div test_handle={props.animation_test_handle} className={classes.animation_circle} style={{ backgroundColor: props.selected_condition === props.type ? handle_colour_assignment() : null, display:props.selected_condition === props.type ? "flex" : "none" }}></div>

                </div>

                <span test_handle={props.test_handle} className={classes.type} style={{ color: handle_colour_assignment() }}>{props.type}</span>

            

        </div>

    )

}

export default Condition
