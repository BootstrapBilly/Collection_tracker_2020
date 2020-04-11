import React from "react"

import classes from "./Condition_card.module.css"

const Condition_card = props => {

    return (

        <div className={classes.container} style={{backgroundColor:props.colour}}>

            <span className={classes.title}>{props.title}</span>

            <span className={classes.number} >{props.number}</span>
            
        </div>

    )

}

export default Condition_card