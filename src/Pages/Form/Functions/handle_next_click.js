/* Check the current step, then respond accordingly */
import { submit_form } from "../../../Store/Actions/Submit_form_action"

import filter_conditions from "./filter_conditions"

import Alert from "easyalert"

const handle_next_click = async (state, set_state, dispatch, form_type, uploaded_image, redirected_from_grid) => {

    if(redirected_from_grid) {

        const year = redirected_from_grid;
        
        return dispatch(submit_form(year, "search_for_book")) //If the input is valid, submit the form 
    
    }

    const year_is_valid = parseInt(state.year) > 1954 && parseInt(state.year) < new Date().getFullYear() + 1 //if the year is between 1955 and the current year

    switch (form_type) {

        //?Add
        case "Add": //if the type is the add book form 

            //_year
            if (state.current_step === "year") {//and the current step is year

                //*validation pass

                if (year_is_valid) { //if a valid year was given

                    /*call the filter conditions function, (found in the functions folder)
                        which sends removes any conditions which are in use before they get rendered on the next screen
                    */
                    await filter_conditions(state)

                        .then(conditions => {

                            if (!conditions) {

                                return Alert(`You have this book in all conditions`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })

                            }

                            else {
                                set_state({
                                    ...state,
                                    available_conditions: conditions,
                                    current_step: "condition"
                                })
                            }
                        })
                        
                }

                //!Validation failure

                //if they entered invalid data, do not progress and inform them
                else {

                    return Alert(`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })

                }

            }

            //_condition

            if (state.current_step === "condition") return set_state({ ...state, current_step: "photo" })

            //_final step

            //last page submits the form with the selected year and condition
            if (state.current_step === "photo") {
            return dispatch(submit_form({ year: state.year, condition: state.selected_condition, url: uploaded_image || null }, "add_book"))}

            break;

        //?Search

        case "Search"://if it is a search form

            if (year_is_valid) return dispatch(submit_form(state.year, "search_for_book")) //If the input is valid, submit the form

            //otherwise do not submit the form and show an alert
            else return Alert(`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })

        default: return
    }

}
/* Used for positioning the easy alert package */

const handle_offset = direction => {

    switch (direction) {

        case "bottom":

            if (window.innerHeight < 600) return "25vh"//small phone

            if (window.innerHeight >= 600 && window.innerHeight <= 850 && window.innerWidth < 1000) return "30vh"//large phone

            if (window.innerHeight > 850) return "170px" //large desktop

            return "60px" //laptop

        case "right":

            if (window.innerWidth < 1000) return "0px" //smaller than desktop

            if (window.innerWidth > 1500) return "35vw"//large desktop

            return "28vw"//laptop

        default: return ""

    }

}

export default handle_next_click