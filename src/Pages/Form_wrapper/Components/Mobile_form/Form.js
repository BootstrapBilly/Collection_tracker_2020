import React from "react"

import classes from "./Form.module.css"

//components
import Input from "../Input_box/Input_box"
import ConditionCircle from "../Condition_circle/Condition_circle"
import Button from "..//Button/Button"
import Landscape from "../../../../Shared Components/Landscape_prompt/Landscape_prompt"

//util
import colours from "../../../../Util/Colours"

const Form = props => {

    const { innerWidth: width } = window;//get the dimensions of the window

    return (

        <React.Fragment>

            <div className={classes.form}>

                <div className={classes.title_container} style={{ display: props.keyboard_active && (width < 1200) ? "none" : "flex", color: colours.dark_blue }}>{props.title}</div>

                <div className={classes.input_container} style={{ marginTop: props.keyboard_active && (width < 1200) ? "4%" : "0", color: colours.dark_blue }}>

                    <Input title="Year of book" onFocus={props.onFocus} onBlur={props.onBlur} grey={props.worth_it} handle_change={props.handle_change} value={props.value}  />

                    <div className={classes.circle_title} style={{ color: colours.blue, display: props.hidden ? "none" : "flex" }}>Condition of book :</div>

                    <div className={classes.circle_container} style={{ display: props.hidden ? "none" : "flex" }}>

                        {[["Poor", colours.red], ["Fair", colours.orange], ["Mint", colours.green]].map(circle => {

                            const condition = circle[0]
                            const colour = circle[1]

                            return <ConditionCircle
                                key={condition}
                                background_colour={colour}
                                text_colour={props.selected_condition === condition ? "white" : colour}
                                text={condition}
                                selected={props.selected_condition}
                                inner_background_colour={null}
                                display={props.selected_condition === condition ? "flex" : "none"}
                                onClick={props.hidden ? null : props.set_selected_condition.bind(this, condition)}/>

                        })}

                    </div>

                    <div className={classes.button_container} style={{ marginTop: props.keyboard_active && (width < 1200) ? "5.5%" : "10%" }}>

                        <Button text={props.button_text} grey={props.worth_it} handle_submit={props.handle_submit}/>

                    </div>

                </div>

            </div>

            <div className={classes.landscape_prompt}>

                <Landscape />
            </div>
        </React.Fragment>

    )

}

export default Form