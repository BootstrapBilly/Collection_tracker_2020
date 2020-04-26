import React, { useState } from 'react'

import classes from "./Desktop_add.module.css"

//external
import colours from "../../../Util/Colours"

//components
import Button from "./Components/Button/Button"
import ConditionSelect from "./Components/Condition_Select/Condition_Select"
import Input from "./Components/Input/Input"
import ImageUpload from "../../../Shared Components/Image_upload/Image_upload"



export const Desktop_add = props => {

    //-config
    const { innerWidth: width } = window;//get the dimensions of the window

    //*states 

    const [current_step, set_current_step] = useState("year")
    const [selected_condition, set_selected_condition] = useState(null)
    const [year, set_year] = useState(null)
    const [input_focus, set_input_focus] = useState(false)

    const handle_back_click = () => current_step === "condition" ? set_current_step("year") : set_current_step("condition")
    const handle_next_click = () => current_step === "year" ? set_current_step("condition") : current_step === "condition" ? set_current_step("photo") : console.log("Bigboi")

    const handle_prompt_message = () => current_step === "year" ? "What's the year of the book?" : current_step === "condition" ? "What condition is it in?" : "Would you like to add a photo ? (Optional)"

    return (

        <React.Fragment>

            <div className={classes.container}>

                <div className={classes.form_container}>

                    <h5 className={classes.title} style={{ color: colours.dark_blue, marginTop: input_focus && (width < 1200) ? "50px" : "20px" }}>ADD A NEW BOOK</h5>

                    <span className={classes.form_message}>{handle_prompt_message()} </span>

                    {current_step === "year" ?

                        <Input year={year} handle_change={event => set_year(event.target.value)} onFocus={()=> set_input_focus(true)} onBlur={()=> set_input_focus(false)}/> :

                        current_step === "condition" ?

                            <ConditionSelect on_select_condition={condition => set_selected_condition(condition)} selected_condition={selected_condition} /> :

                            <ImageUpload style={{ backgroundColor: "#f8f8ff", marginTop: "30px"}} />
                    }

                    <div className={classes.button_container}>

                        <Button year={year} current_step={current_step} step={current_step} selected_condition={selected_condition} text="Go Back"
                            onClick={() => handle_back_click()} type="back"/>

                        <Button year={year} current_step={current_step} step={current_step} selected_condition={selected_condition} text="Add Book"
                            onClick={() => handle_next_click()} />

                    </div>

                </div>

            </div>

        </React.Fragment>
    )

}

export default Desktop_add