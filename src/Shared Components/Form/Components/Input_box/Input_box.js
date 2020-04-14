import React, {useState} from "react"

import classes from "./Input_box.module.css"

import colours from "../../../../Util/Colours"

const Input = props => {

    const [input, set_input] = useState("")

    return (

        <div className={classes.container}>

            <div className={classes.title_container} style={{color:colours.blue}}>{props.title} :</div>

            <input value={input} type="text" className={classes.input_box} style={{border: `2px solid ${colours.blue}`}} onFocus={props.onFocus} onChange={e => set_input(e.target.value)} onInput={props.handle_input.bind(this, input)} onBlur={props.onBlur}/>

        </div>
    )
}

export default Input