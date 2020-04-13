import React from "react"

import classes from "./Condition_circle.module.css"

const Condition_circle = props => {

    return (

        <div className={classes.container} style={{ backgroundColor: props.colour }}>

            <div className={classes.inner_container} style={{color:props.colour}}>{props.text}</div>

        </div>

    )

}

export default Condition_circle