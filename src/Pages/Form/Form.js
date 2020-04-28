import React, { useState } from 'react'

import classes from "./Form.module.css"

//external
import colours from "../../Util/Colours"

//components
import Button from "./Components/Button/Button"
import ConditionSelect from "./Components/Condition_Select/Condition_Select"
import Input from "./Components/Input/Input"
import ImageUpload from "../../Shared Components/Image_upload_/Image_upload"
import Alert from "../../Shared Components/Alert/Alert"

//redux hooks
import { useDispatch } from "react-redux"

//redux action creators
import { submit_form } from "../../Store/Actions/Submit_form_action"

//functions
import handle_back_click from "./Functions/handle_back_click"
import handle_next_click from "./Functions/handle_next_click"
import set_conditions from "./Functions/set_available_conditions"
import set_prompt_message from "./Functions/set_prompt_message"

export const Desktop_add = props => {

    //-config
    const { innerWidth: width } = window;//get the dimensions of the window
    const dispatch = useDispatch()

    //*states 

    const [current_step, set_current_step] = useState("year")//the current step of the form, year/condition/photo
    const [year, set_year] = useState(null)//the entered year
    const [selected_condition, set_selected_condition] = useState(null)//the selected condition
    const [input_focus, set_input_focus] = useState(false)//detect input focus for mobile
    const [feedback_info, set_feedback_info] = useState([null, "hidden"])//set feedback message text
    const [available_conditions, set_available_conditions] = useState([])//hold available conditions (all conditions - existing conditions)

    return (

        <React.Fragment>

            <div className={classes.container}>

                <div className={classes.form_container}>

                    <h5 test_handle="form_prompt_message" className={classes.title} style={{ color: colours.dark_blue, marginTop: input_focus && (width < 1200) ? "40px" : "20px" }}>ADD A NEW BOOK</h5>

                    <span className={classes.form_message}>{set_prompt_message(current_step)}</span>

                    {
                        current_step === "year" ?

                            <Input year={year} error={feedback_info[0]} test_handle="form_input"
                                handle_change={event => {
                                    set_feedback_info([null, "hidden"])
                                    set_year(event.target.value)
                                }}
                                onFocus={() => set_input_focus(true)} onBlur={() => set_input_focus(false)}
                            />

                            :

                            current_step === "condition" ?

                                <ConditionSelect 

                                    test_handle="condition_select"
                                    animation_circle_test_handle="condition_animation_circle"
                                    circle_test_handle="condition_circle"

                                    on_select_condition={condition => set_selected_condition(condition)}
                                    selected_condition={selected_condition}
                                    available_conditions={available_conditions}
                                />

                                :

                                <ImageUpload style={{ backgroundColor: "#f8f8ff" }} year={year} test_handle="form_image_upload" />
                    }


                    <div className={classes.button_container} style={{ marginTop: current_step === "photo" && "-15px" }}>

                        <Button year={year} current_step={current_step} selected_condition={selected_condition} text="Go Back" test_handle="form_back_button"
                            onClick={() => handle_back_click(current_step, set_current_step)} type="back" />

                        <Button year={year} current_step={current_step} selected_condition={selected_condition} text="Add Book" test_handle="form_next_button"
                            onClick={() => handle_next_click(current_step, set_current_step, year, selected_condition, set_conditions, set_feedback_info, dispatch, submit_form, set_available_conditions)} />

                    </div>

                </div>

                {<Alert message={feedback_info[0]} type={feedback_info[1]} />}

            </div>

        </React.Fragment>
    )

}

export default Desktop_add