import React from 'react'

import classes from "./Edit_panel.module.css"

//COMPONENTS
import ConditionCircle from "../../Condition_circle/Condition_circle"

//util
import colours from "../../../../../Util/Colours"

export const Edit_panel = props => {

    return (

        <div className={classes.container}>

            <div className={classes.circle_container} style={{ display: props.hidden ? "none" : "flex" }}>

                {[["Poor", colours.red], ["Fair", colours.orange], ["Mint", colours.green]].map(circle => {

                    const condition = circle[0]
                    const colour = circle[1]

                    return <ConditionCircle
                        key={condition}
                        background_colour={colour}
                        text_colour={props.selected_condition === condition ? "white" : colour}
                        text={condition}
                        inner_background_colour={null}
                        display={props.selected_condition === condition ? "flex" : "none"}
                        selected={props.selected_condition}
                        onClick={props.set_selected_condition.bind(this, condition)} />

                })}

            </div>

        </div>
    )

}

export default Edit_panel
