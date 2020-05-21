//core react
import React, { useState, useEffect } from 'react'

//css
import classes from "./Form.module.css"
import backgrounds from "./Background_image.module.css"

//external
import colours from "../../Util/Colours"
import Alert from "easyalert"
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { motion } from "framer-motion"

//components
import ConditionSelect from "./Components/Condition_Select/Condition_Select"
import Input from "./Components/Input/Input"
import ImageUpload from "../../Shared Components/Image_upload_/Image_upload"
import Book from "./Components/Book/Book"
import Tutorial from "../../Shared Components/Tutorial/Tutorial"
import NavigationButtons from "./Components/Navigation_buttons/Navigation_buttons"
import IconBar from "../../Shared Components/Icon_bar/Icon_bar"
import PageTransition from "../../Shared Components/Page_transition/Page_transition"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//functions
import handle_back_click from "./Functions/handle_back_click"
import handle_next_click from "./Functions/handle_next_click"
import set_prompt_message from "./Functions/set_prompt_message"
import order_books_by_condition from "./Functions/order_books_by_condition"
import delete_image_from_firebase from "./Functions/delete_image_from_firebase"
import reset_form from "./Functions/reset_form"
import handle_tutorial_completion from "../../Util/Handle_tutorial_completion"

//util
import { transition, duration } from "../../Util/Page_transitions"


export const Form = props => {

    //-config
    const dispatch = useDispatch()//initialise the redux hook

    //*states 

    const [state, set_state] = useState({
        current_step: "year", //the current step of the form, => year/condition/photo <=
        year: null,//the entered year
        selected_condition: null,//the selected condition
        available_conditions: ["Poor", "Fair", "Mint"],//hold available conditions (all conditions - (minus) existing conditions)
        tutorial_completed: window.localStorage.getItem(`${props.type}_tutorial_completed`),
        redirect: false
    })

    //?selectors
    const form_submission_response = useSelector(state => state.result.submission_result)//get the response data from form request
    const photo_uploaded = useSelector(state => state.upload.last_uploaded_photo)//Listens for photo uploads (changes triggered by ImageUpload component)

    //!effects
    useEffect(() => {

        if (form_submission_response && form_submission_response.success) {//if there is a submission result, and it was successful

            if (form_submission_response.details.type === "delete") { //and the submission was deleting a book

                delete_image_from_firebase(form_submission_response.details.year, form_submission_response.details.condition)//delete the image from firebase

                if (!form_submission_response.details.books.length) {//If it was the last book of that year (no remaining conditions returned)

                    reset_form(dispatch, props, state, set_state)
                    set_state({ ...state, redirect: "/" })

                }

                //otherwise the page will be reloaded with the remaining books

                return Alert("Book deleted successfully", "success")//show the user an alert that their book has been deleted

            }

        }

        // eslint-disable-next-line
    }, [form_submission_response])


    useEffect(() => {

        if (props.location.state && props.location.state.missing){ //if the user was redirected by clicking a missing book

            set_state({year:props.location.state.year, current_step:"year"})//prepopulate the form

        }

        if (props.location.state && props.location.state.redirected_from_nav)//if the user was redirect from the nav bar
    
            reset_form(dispatch, props, state, set_state)//reset form 

    }, [])

    const handle_background_assignment = () => {

        if (form_submission_response || (props.location.state && props.location.state.redirected_from_grid) || (props.location.state && props.location.state.missing)) return
        if (props.type === "Add") return backgrounds.add
        if (props.type === "Search") return backgrounds.search

        return
    }

    return (

        <React.Fragment>

            <motion.div className={[classes.container, handle_background_assignment()].join(" ")} initial="initial" animate="in" exit="out" variants={transition} transition={duration}>

                {//If there is a submission response - display the book 

                    form_submission_response ?

                        <Book

                            year={state.year}
                            photo_uploaded={photo_uploaded}
                            books={order_books_by_condition(form_submission_response.details.books)}

                            //if they are adding a book, reload the form, if they are only looking at it, redirect to grid
                            on_go_back_click={() => props.type === "Search" ? set_state({ ...state, redirect: "/" }) : reset_form(dispatch, props, state, set_state)}
                            type={props.type}

                        />

                        :// No submission response -  display the form 

                        /* This form displays different content based on the current step state
                        The state is modified via the handle_next_click and handle_back_click functions */

                        <div className={classes.form_container}>

                            <h5 test_handle="form_prompt_message" className={classes.title} style={{ color: colours.dark_blue }}>{props.title}</h5>

                            <span className={classes.form_message}>{set_prompt_message(state.current_step) /*Set the prompt based on the form type and step */}</span>

                            {
                                state.current_step === "year" ? //if the current step is year

                                    <Input year={state.year} error={null} test_handle="form_input" //display the input component

                                        handle_change={event => {

                                            if (isNaN(event.target.value)) return //if the input is not a number, do not accept it
                                            set_state({ ...state, year: event.target.value })//otherwise update the input value
                                        }

                                        }

                                        //allow the user to progress to the next step by pressing the enter key, as well as clicking next
                                        handle_keydown={event =>

                                            state.year && state.year.length === 4 && event.key === "Enter" && //if the year is at least 4 characters               
                                            handle_next_click(state, set_state, dispatch, props.type, photo_uploaded)}//navigate to the next step 

                                    />

                                    :

                                    state.current_step === "condition" ? //if the current step is condition

                                        <ConditionSelect //display the condition select component

                                            test_handle="condition_select"
                                            animation_circle_test_handle="condition_animation_circle"
                                            circle_test_handle="condition_circle"
                                            on_select_condition={condition => set_state({ ...state, selected_condition: (condition) })}
                                            selected_condition={state.selected_condition}
                                            available_conditions={state.available_conditions}

                                        />

                                        :

                                        state.current_step === "photo" && //Otherwise if the step is photo, display the photo upload component

                                        <ImageUpload style={{ backgroundColor: "#f8f8ff" }} year={state.year} condition={state.selected_condition} test_handle="form_image_upload" />
                            }

                            <NavigationButtons /* The go back and next buttons - Clicking them calls a function which decides what to do next */

                                year={state.year}
                                selected_condition={state.selected_condition}
                                current_step={state.current_step}
                                handle_back_click={() => handle_back_click(state, set_state)}//Handle_back_click and handle_next_click found in functions folder
                                handle_next_click={() => handle_next_click(state, set_state, dispatch, props.type, photo_uploaded)}

                            />

                        </div>
                }


                {/* {state.tutorial_completed && <NavBar path={props.path} onClickIcon={() => reset_form(dispatch, props, state, set_state)} />} */}

                {!state.tutorial_completed &&

                    <Tutorial

                        text={

                            props.type === "Add" ? "Here you can add new books to your collection."
                                : props.type === "Search" && "This is where you can search for, delete and update books in your collection."

                        }

                        handle_completion={() => handle_tutorial_completion(props.type, state, set_state)}

                    />}

                {state.redirect && <Redirect to={{ pathname: state.redirect, type: state.redirect }} />}

            </motion.div>

            <IconBar active_icon="add"

                handle_select_icon={type => {

                    reset_form(dispatch, props, state, set_state)
                    set_state({ ...state, redirect: type })

                }}

            />

        </React.Fragment>
    )

}

export default withRouter(Form)