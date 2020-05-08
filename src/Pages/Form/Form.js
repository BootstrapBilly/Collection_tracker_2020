import React, { useState, useEffect } from 'react'

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

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { submit_form, clear_submission_result } from "../../Store/Actions/Submit_form_action"

//functions
import handle_back_click from "./Functions/handle_back_click"
import handle_next_click from "./Functions/handle_next_click"
import set_conditions from "./Functions/set_available_conditions"
import set_prompt_message from "./Functions/set_prompt_message"

//util




export const Form = props => {

    const dispatch = useDispatch()

    //*states 
    const [current_step, set_current_step] = useState("year")//the current step of the form, year/condition/photo
    const [year, set_year] = useState(null)//the entered year
    const [selected_condition, set_selected_condition] = useState(null)//the selected condition
    const [available_conditions, set_available_conditions] = useState(["Poor", "Fair", "Mint"])//hold available conditions (all conditions - existing conditions)
    const [submission_result_data, set_submission_result_data] = useState(null)

    //?selectors
    const submission_result = useSelector(state => state.result.submission_result)


    //!effects
    useEffect(() => {

        if (submission_result && submission_result.success) {

            set_submission_result_data(submission_result.details)

            if (submission_result.details.type === "delete") {

                return Alert("Book deleted successfully", "success")

            }

        }

        // eslint-disable-next-line
    }, [submission_result])

    //  console.log(submission_result)

    useEffect(() => {
        console.log(props.location.state)
        if(props.location.state && props.location.state.redirected_from_book){
            dispatch(clear_submission_result())
            set_current_step("year")
            set_year(props.location.state.year)
        }
    },[])

    //_ functions
    const handle_result_back_click = () => {

        if (props.type === "Add") window.location.reload()
            .then(() => clear_submission_data())

        else clear_submission_data()

    }

    const clear_submission_data = () => {

        dispatch(clear_submission_result())
        set_submission_result_data(null)

    }

    const sort_conditions = books => {

        const weighted_books = [];
        const weightings = [["Poor", 1], ["Fair", 2], ["Mint", 3]]

        books.forEach(book => weightings.forEach(condition => {

            if (book.condition === condition[0]) weighted_books.push({ book: book, weighting: condition[1] })

        }))

        return weighted_books.sort((a, b) => a.weighting < b.weighting && -1)

    }





    return (

        <React.Fragment>

                <div className={[classes.container, props.type === "Add" ? backgrounds.add : props.type === "Search" ? backgrounds.search : backgrounds.worth].join(" ")}>

                    {
                        submission_result && submission_result.error === "Not_found" ?

                            <Book year={submission_result.details} missing on_back_click={() => handle_result_back_click()} /> :

                            submission_result_data &&

                                (submission_result_data.type === "add" || submission_result_data.type === "search" || submission_result_data.type === "delete") ?

                                <div className={classes.book_container}>

                                    {sort_conditions(submission_result.details.books).map(book => { return <Book year={book.book.year} condition={book.book.condition} on_back_click={() => handle_result_back_click()} key={book.book._id} /> })}

                                </div>

                                : submission_result_data && submission_result_data.type === "worth" ? "Worth" :

                                    <div className={classes.form_container}>

                                        <h5 test_handle="form_prompt_message" className={classes.title} style={{ color: colours.dark_blue, marginTop: "20px" }}>{props.title}</h5>

                                        <span className={classes.form_message}>{set_prompt_message(current_step)}</span>

                                        {
                                            current_step === "year" ?

                                                <Input year={year} error={null} test_handle="form_input"
                                                    handle_change={event => set_year(event.target.value)}
                                                    handle_keydown={event => year && year.length === 4 && event.key === "Enter" && handle_next_click(current_step, set_current_step, year, selected_condition, set_conditions, dispatch, submit_form, set_available_conditions, props.type)}
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

                                                    <ImageUpload style={{ backgroundColor: "#f8f8ff" }} year={year} condition={selected_condition} test_handle="form_image_upload" />
                                        }


                                        <div className={classes.button_container} style={{ marginTop: current_step === "photo" && "-15px" }}>

                                            <Button year={year} current_step={current_step} selected_condition={selected_condition} text="Go Back" test_handle="form_back_button"
                                                onClick={() => handle_back_click(current_step, set_current_step)} type="back" />

                                            <Button year={year} current_step={current_step} selected_condition={selected_condition} text="Add Book" test_handle="form_next_button"
                                                onClick={() => handle_next_click(current_step, set_current_step, year, selected_condition, set_conditions, dispatch, submit_form, set_available_conditions, props.type)} />

                                        </div>

                                    </div>
                    }

                    <NavBar path={props.path} onClickIcon={() => dispatch(clear_submission_result())} />

                </div>

        </React.Fragment>
    )

}

export default withRouter(Form)