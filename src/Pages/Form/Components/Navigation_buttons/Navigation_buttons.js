import React from 'react'

import classes from "./Navigation_buttons.module.css"

//components
import Button from "../Button/Button"

export const Navigation_buttons = props => {

    return (

        <div className={classes.button_container} style={{ marginTop: props.current_step === "photo" && "-15px" }}>

            <Button year={props.year} current_step={props.current_step} selected_condition={props.selected_condition} text="Go Back" test_handle="form_back_button"
                onClick={props.handle_back_click} type="back" />

            <Button year={props.year} current_step={props.current_step} selected_condition={props.selected_condition} text="Add Book" test_handle="form_next_button"
                onClick={props.handle_next_click} />

        </div>

    )

}

export default Navigation_buttons