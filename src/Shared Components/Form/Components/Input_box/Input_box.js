import React from "react"

import classes from "./Input_box.module.css"

import colours from "../../../../Util/Colours"

const Input = props => {

    return (

        <div className={classes.container}>

            <div className={classes.title_container} style={{color:colours.blue}}>{props.title} :</div>

            <input type="text" className={classes.input_box} style={{border: `2px solid ${colours.blue}`}} onFocus={props.onFocus} />

        </div>
    )
}

export default Input