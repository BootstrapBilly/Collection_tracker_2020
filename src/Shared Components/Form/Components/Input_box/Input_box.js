import React from "react"

import classes from "./Input_box.module.css"

import colours from "../../../../Util/Colours"

const Input = props => {

    return (

        <div className={classes.container}>

            <div className={classes.title_container} style={{color:props.grey ? colours.grey : colours.blue}}>{props.title} :</div>

            <input value={props.value} maxLength={4} type="text" className={classes.input_box} style={{border: `2px solid ${props.grey ? colours.grey : colours.blue}`}} onFocus={props.onFocus} onChange={props.handle_change} onBlur={props.onBlur}/>

        </div>
    )
}

export default Input