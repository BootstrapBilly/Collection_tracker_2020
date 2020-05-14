//core react
import React, { useState, useEffect } from 'react'

//css
import classes from "./Form.module.css"
import backgrounds from "./Background_image.module.css"

//external
import colours from "../../Util/Colours"
import Alert from "easyalert"
import { withRouter } from 'react-router-dom';

//components
import Button from "./Components/Button/Button"
import ConditionSelect from "./Components/Condition_Select/Condition_Select"
import Input from "./Components/Input/Input"
import ImageUpload from "../../Shared Components/Image_upload_/Image_upload"
import NavBar from "../../Shared Components/Options_bar/Options_bar"
import Book from "./Components/Book/Book"
import FTP from "../../Shared Components/First_time_prompt/First_time_prompt"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { submit_form, clear_form_submission_response } from "../../Store/Actions/Submit_form_action"

//functions
import handle_back_click from "./Functions/handle_back_click"
import handle_next_click from "./Functions/handle_next_click"
import set_conditions from "./Functions/set_available_conditions"
import set_prompt_message from "./Functions/set_prompt_message"
import order_books_by_condition from "./Functions/order_books_by_condition"

//util
import { storage } from "../../firebase/index"

export const Form = props => {

    //-config
    const dispatch = useDispatch()//initialise the redux hook

    //*states 
    const [current_step, set_current_step] = useState("year")//the current step of the form, => year/condition/photo <=
    const [year, set_year] = useState(null)//the entered year
    const [selected_condition, set_selected_condition] = useState(null)//the selected condition
    const [available_conditions, set_available_conditions] = useState(["Poor", "Fair", "Mint"])//hold available conditions (all conditions - (minus) existing conditions)

    //?selectors
    const form_submission_response = useSelector(state => state.result.submission_result)//get the response data from form request
    const tut_completed = useSelector(state => state.tutorial.completed)//The tutorial shown on first visit (Stored in local storage when finished)
    const photo_changed = useSelector(state => state.upload.last_uploaded_photo)

    //_ functions
    const reset_form = () => {

        dispatch(clear_form_submission_response())//clear the response data from the reducer
        set_current_step("year")//set the step back to year
        set_year(null)//clear the year value (state)
        set_selected_condition(null)//clear the condition value (state)

    }

    const display_and_prepopulate_form = () => {

        dispatch(clear_form_submission_response())//clear all submission data
        set_current_step("year")//set the form to the year step
        set_year(props.location.state.year)//Prepopulate the year input with the missing year they was redirected from
        props.history.replace()//clear the navigation data (cleanup)

    }

    const delete_image_from_firebase = () => {

        storage.ref("images")
            .child(form_submission_response.details.year.toString() + "-" + form_submission_response.details.condition.toString())//find the book with the deleted year and condition
            .delete()//and delete it
            .then(a => { return })
            .catch(a => { return })

    }

    //!effects

    useEffect(() => {

        if (form_submission_response && form_submission_response.success) {//if there is a submission result, and it was successful

            if (form_submission_response.details.type === "delete") { //and the submission was deleting a book

                delete_image_from_firebase()//delete the image from firebase

                if (!form_submission_response.details.books.length) {//If it was the last book of that year (no remaining conditions returned)

                    reset_form()//reset the form 

                }

                //otherwise the page will be reloaded with the remaining books

                return Alert("Book deleted successfully", "success")//show the user an alert that their book has been deleted

            }

        }

        // eslint-disable-next-line
    }, [form_submission_response])

    useEffect(() => {

        //If the user was redirected here by clicking the "plus button" after searching for a book that is missing
        if (props.location.state && props.location.state.redirected_from_book) display_and_prepopulate_form()

        // eslint-disable-next-line
// eslint-disable-next-line
    }, [])

    console.log(form_submission_response)

    return (

        <React.Fragment>

            <div className={[classes.container, props.type === "Add" && backgrounds.add, props.type === "Search" && backgrounds.search].join(" ")}>

                {//If there is a submission response - display the book 

                    form_submission_response ?

                        <Book year={year} on_back_click={() => reset_form()} photo_changed={photo_changed}
                            books={order_books_by_condition(form_submission_response.details.books)} on_go_back_click={()=> reset_form()} />

                        :// No submission response -  display the form 

                        /* This form displays different content based on the current step state
                        The state is modified via the handle_next_click and handle_back_click functions */

                        <div className={classes.form_container}>

                            <h5 test_handle="form_prompt_message" className={classes.title} style={{ color: colours.dark_blue, marginTop: "20px" }}>{props.title}</h5>

                            <span className={classes.form_message}>{set_prompt_message(current_step) /*Set the prompt based on the form type and step */}</span>

                            {
                                current_step === "year" ? //if the current step is year

                                    //display the year input
                                    <Input year={year} error={null} test_handle="form_input"
                                        handle_change={event => set_year(event.target.value)}

                                        //allow the user to progress to the next step by pressing enter, as well as clicking next
                                        handle_keydown={event => year && year.length === 4 && event.key === "Enter" && handle_next_click(current_step, set_current_step, year, selected_condition, set_conditions, dispatch, submit_form, set_available_conditions, props.type)}
                                    />

                                    :

                                    current_step === "condition" ? //if the current step is condition

                                        <ConditionSelect //display the condition select component

                                            test_handle="condition_select"
                                            animation_circle_test_handle="condition_animation_circle"
                                            circle_test_handle="condition_circle"

                                            on_select_condition={condition => set_selected_condition(condition)}
                                            selected_condition={selected_condition}
                                            available_conditions={available_conditions}
                                        />

                                        : current_step === "photo" && //Otherwise if the step is photo, display the photo upload component

                                        <ImageUpload style={{ backgroundColor: "#f8f8ff" }} year={year} condition={selected_condition} test_handle="form_image_upload" />
                            }

                            {/* The back and next buttons
                            Clicking them calls a function which decides what to do next */}

                            <div className={classes.button_container} style={{ marginTop: current_step === "photo" && "-15px" }}>

                                <Button year={year} current_step={current_step} selected_condition={selected_condition} text="Go Back" test_handle="form_back_button"
                                    //onclick is handled by a function (in the functions folder)
                                    onClick={() => handle_back_click(current_step, set_current_step)} type="back" />

                                <Button year={year} current_step={current_step} selected_condition={selected_condition} text="Add Book" test_handle="form_next_button"
                                    //onclick is handled by a function (in the functions folder)
                                    onClick={() => handle_next_click(current_step, set_current_step, year, selected_condition, set_conditions, dispatch, submit_form, set_available_conditions, props.type, photo_changed)} />

                            </div>

                        </div>
                }

                {tut_completed ? //if the tutorial has been completed, 

                    <NavBar path={props.path} onClickIcon={() => reset_form()} /> //display the navbar

                    ://Otherwise 

                    <div className={classes.click_prevent_overlay}><FTP tutorial_stage={props.type === "Add" ? 3 : 4} /></div> /* Display the tutorial*/}

            </div>

        </React.Fragment>
    )

}

export default withRouter(Form)