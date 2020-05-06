/* Check the current step, then respond accordingly */
import Alert from "easyalert"

const handle_next_click = async (current_step, set_current_step, year, selected_condition, set_conditions, set_feedback_info, dispatch, submit_form, set_selected_condition, form_type) => {

    set_feedback_info([null, "hidden"])//firstly clear any user feedback, incase it needs to be showed again

    switch (form_type) {

        //?Add
        case "Add":

            //_year
            if (current_step === "year") {

                //*validation pass

                if (parseInt(year) > 1954 && parseInt(year) < new Date().getFullYear() + 1) { //if the year is between 1955 and the current year

                    const available_conditions = await set_conditions(year, set_selected_condition)//check if any conditions are taken for the given year

                    if (available_conditions === false) return Alert(`You have this book in every condition`, "error")

                    //Otherwise set the available conditions on the next page
                    set_conditions(year, set_selected_condition)//located in the functions folder
                        .then(r => set_current_step("condition"))//After they have been set, load the page

                }

                //!Validation failure

                else {
                    return Alert(`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })//set the validation error
                }

            }

            //_condition

            if (current_step === "condition") return set_current_step("photo")


            //_Add book

            //last page submits the form with the selected year and condition
            return dispatch(submit_form({ year: year, condition: selected_condition }, "add_book"))

        //?Search
        case "Search":

            //Submit the search request
            return dispatch(submit_form(year, "search_for_book"))

        case "Worth":

            //_year
            if (current_step === "year") {

                //*validation pass
                if (parseInt(year) > 1954 && parseInt(year) < new Date().getFullYear() + 1) return set_current_step("condition")//set the step to condition

                //!Validation failure
                set_feedback_info([`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error"])//set the validation error

                return document.getElementById("root").insertBefore(document.getElementById("alert_container"), document.querySelector(".App"))//inject it into the dom

            }

            return dispatch(submit_form({ year: year, condition: selected_condition }, "worth_buying"))

        default: return
    }




}

const handle_offset = direction => {

    switch (direction) {

        case "bottom":

            if (window.innerHeight < 600) return "25vh"

            if (window.innerHeight >= 600 && window.innerHeight <= 850 && window.innerWidth < 1000) return "30vh"

            if (window.innerHeight > 850) return "170px"

            return "60px"

        case "right":

            if (window.innerWidth < 1000) return "0px"

            if (window.innerWidth > 1500) return "35vw"

            return "28vw"

        default: return ""

    }

}

export default handle_next_click