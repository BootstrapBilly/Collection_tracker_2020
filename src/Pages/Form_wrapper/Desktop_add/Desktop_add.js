import React, { useState, useEffect } from 'react'

import classes from "./Desktop_add.module.css"

//external
import colours from "../../../Util/Colours"
import {post} from "axios"

//components
import Button from "./Components/Button/Button"
import ConditionSelect from "./Components/Condition_Select/Condition_Select"
import Input from "./Components/Input/Input"
import ImageUpload from "../../../Shared Components/Image_upload_/Image_upload"
import Alert from "../../../Shared Components/Alert/Alert"

//redux hooks
import {useDispatch, useSelector} from "react-redux"

//redux action creators
import { submit_form } from "../../../Store/Actions/Submit_form_action"

export const Desktop_add = props => {

    //-config
    const { innerWidth: width } = window;//get the dimensions of the window
    const dispatch = useDispatch()

    //*states 

    const [current_step, set_current_step] = useState("year")
    const [selected_condition, set_selected_condition] = useState(null)
    const [year, set_year] = useState(null)
    const [input_focus, set_input_focus] = useState(false)
    const [feedback_info, set_feedback_info] = useState([null, "hidden"])
    const [available_conditions, set_available_conditions] = useState([])

    //_functions

    const handle_back_click = () => current_step === "condition" ? set_current_step("year") : set_current_step("condition")

    const handle_next_click = async () => {

        set_feedback_info([null, "hidden"])

        if(current_step === "year"){

            if(parseInt(year) > 1954 && parseInt(year) < new Date().getFullYear() + 1) {

                check_condition()

                return set_current_step("condition")}
        
            set_feedback_info([`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error"])

            return document.getElementById("root").insertBefore(document.getElementById("alert_container"), document.querySelector(".App"))
            
        }

        if(current_step === "condition") {

            return set_current_step("photo")
        }

        return dispatch(submit_form({year:year, condition:selected_condition}, "add_book"))
    }


    const handle_prompt_message = () => current_step === "year" ? "What's the year of the book?" : current_step === "condition" ? "What condition is it in?" : "Would you like to add a photo ? (Optional)"

    const check_condition = async() => {

        let all_conditions = ["Poor", "Fair", "Mint"]

        const response = await post("http://localhost:4000/get_conditions", {form_values:year})

        const existing_conditions = response.data.conditions

        if(!existing_conditions) return set_available_conditions(all_conditions)

        set_available_conditions([...all_conditions.filter(condition => condition.toString() !== existing_conditions.toString())])
    }

    return (

        <React.Fragment>

            <div className={classes.container}>

                <div className={classes.form_container}>

                    <h5 className={classes.title} style={{ color: colours.dark_blue, marginTop: input_focus && (width < 1200) ? "40px" : "20px" }}>ADD A NEW BOOK</h5>

                    <span className={classes.form_message}>{handle_prompt_message()} </span>

                    {current_step === "year" ?

                        <Input year={year} error={feedback_info[0]} handle_change={event => {
                            
                            set_feedback_info([null, "hidden"])
                            set_year(event.target.value)}
                        
                        } onFocus={()=> set_input_focus(true)} onBlur={()=> set_input_focus(false)}/> :

                        current_step === "condition" ?

                            <ConditionSelect on_select_condition={condition => set_selected_condition(condition)} selected_condition={selected_condition} available_conditions={available_conditions} /> :

                            <ImageUpload style={{ backgroundColor: "#f8f8ff"}} year={year} />
                    }

                    <div className={classes.button_container} style={{marginTop: current_step === "photo" && "-15px"}}>

                        <Button year={year} current_step={current_step} step={current_step} selected_condition={selected_condition} text="Go Back"
                            onClick={() => handle_back_click()} type="back"/>

                        <Button year={year} current_step={current_step} step={current_step} selected_condition={selected_condition} text="Add Book"
                            onClick={() => handle_next_click()}/>

                    </div>

                </div>

                {<Alert message={feedback_info[0]} type={feedback_info[1]}/>}

            </div>

        </React.Fragment>
    )

}

export default Desktop_add