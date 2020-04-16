import React from "react"

import classes from "./Desktop_form.module.css"

//components
import Input from "../../Shared Components/Form/Components/Input_box/Input_box"
import ConditionCircle from "../../Shared Components/Form/Components/Condition_circle/Condition_circle"

//util
import colours from "../../Util/Colours"

const Desktop_form = props => {

    return (

        <div className={classes.container}>

            <div className={classes.form_container}>

                <span className={classes.title} style={{ color: props.grey ? colours.dark_grey : colours.dark_blue }}>{props.title}</span>

                <div className={classes.input_container}>

                    <Input title="Year of book" onFocus={props.onFocus} onBlur={props.onBlur} grey={props.grey} handle_change={props.handle_change} value={props.value} />

                </div>

                <div className={classes.circle_container} style={{ display: props.hidden ? "none" : "flex" }}>

                    <span className={classes.condition_of_book} style={{ color: props.grey ? colours.grey : colours.blue }}>Condition of book :</span>

                    <div className={classes.inner_circle_container}>

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

                </div>

                <div className={classes.button_container}>

                    <div className={classes.button} style={{ backgroundColor: props.grey ? colours.grey : colours.blue, boxShadow: `1px 1px 2px 1px ${props.grey ? colours.dark_grey : colours.dark_blue}`}}           
                    onClick={props.handle_submit}>{props.button_text}</div>

                </div>

            </div>

        </div>

    )

}

export default Desktop_form