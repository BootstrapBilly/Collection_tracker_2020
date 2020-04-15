import React, { useState } from "react"

import classes from "./Desktop_form.module.css"

//components
import Input from "../../Shared Components/Form/Components/Input_box/Input_box"
import ConditionCircle from "../../Shared Components/Form/Components/Condition_circle/Condition_circle"

//util
import colours from "../../Util/Colours"

const Desktop_form = props => {

    const [selected_condition, set_selected_condition] = useState(null)//defines which condition button is selected
    const [input, set_input] = useState("")//holds the value from the input component (used to change the colour of the button once populated)

    return (

        <div className={classes.container}>

            <div className={classes.form_container}>

            <span className={classes.title} style={{ color: colours.dark_blue }}>{props.title}</span>

                <div className={classes.input_container}>

                    <Input title="Year of book" onFocus={props.onFocus} handle_input={input => set_input(input)} onBlur={props.onBlur} />

                </div>

                <div className={classes.circle_container}>

                    <span className={classes.condition_of_book} style={{ color: colours.blue }}>Condition of book :</span>

                    <div className={classes.inner_circle_container}>

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

                </div>

                <div className={classes.button_container}>

                    <div className={classes.button} style={{backgroundColor: colours.blue, boxShadow: `1px 1px 2px 1px ${colours.dark_blue}` }}>{props.button_text}</div>

                </div>

            </div>

        </div>

    )

}

export default Desktop_form