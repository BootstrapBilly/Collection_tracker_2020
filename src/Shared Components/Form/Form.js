import React, { useState } from "react"

import classes from "./Form.module.css"

//components
import Input from "./Components/Input_box/Input_box"
import ConditionCircle from "./Components/Condition_circle/Condition_circle"
import Button from "./Components/Button/Button"

//util
import colours from "../../Util/Colours"

const Form = props => {

    const [selected_condition, set_selected_condition] = useState(null)//defines which condition button is selected
    const [input, set_input] = useState("")//holds the value from the input component (used to change the colour of the button once populated)

    return (

        <div className={classes.form}>

            <div className={classes.input_container}>

                <Input title="Year of book" onFocus={props.onFocus} handle_blur={input => set_input(input)} />

                <div className={classes.circle_title} style={{ color: colours.blue }}>Condition of book :</div>

                <div className={classes.circle_container}>

                    {[["Poor", colours.red], ["Fair", colours.orange], ["Mint", colours.green]].map(circle => {

                        const condition = circle[0]
                        const colour = circle[1]

                        return <ConditionCircle
                            background_colour={colour}
                            text_colour={selected_condition === condition ? "white" : colour}
                            text={condition}
                            selected={selected_condition}
                            inner_background_colour={null}
                            display={selected_condition === condition ? "flex" : "none"}
                            onClick={() => set_selected_condition(condition)} />

                    })}

                </div>

                <div className={classes.button_container}>

                    <Button text={props.button_text} ready_to_submit={selected_condition && (input.length) ? true : false} />

                </div>

            </div>

        </div>

    )

}

export default Form