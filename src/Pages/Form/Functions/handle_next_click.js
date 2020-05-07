/* Check the current step, then respond accordingly */
import Alert from "easyalert"

const handle_next_click = async (current_step, set_current_step, year, selected_condition, set_conditions, dispatch, submit_form, set_selected_condition, form_type) => {

    const year_is_valid = parseInt(year) > 1954 && parseInt(year) < new Date().getFullYear() + 1 //if the year is between 1955 and the current year
    
    switch (form_type) {

        //?Add
        case "Add":

            //_year
            if (current_step === "year") {

                //*validation pass

                if (year_is_valid) { 

                    const available_conditions = await set_conditions(year, set_selected_condition)//check if any conditions are taken for the given year

                    if (available_conditions === false) return Alert(`You have this book in all conditions`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })

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
            if (current_step === "photo") return dispatch(submit_form({ year: year, condition: selected_condition }, "add_book"))

            break;

        //?Search
        case "Search":

        if(year_is_valid) return dispatch(submit_form(year, "search_for_book"))

        else return Alert(`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })

        case "Worth":

            //_year
            if (current_step === "year") {

                //*validation pass
                if (year_is_valid) return set_current_step("condition")//set the step to condition

                //!Validation failure
                else return Alert(`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })

            }

            return dispatch(submit_form({ year: year, condition: selected_condition }, "worth_buying"))

        default: return
    }




}

const handle_offset = direction => {

    switch (direction) {

        case "bottom":

            if (window.innerHeight < 600) return "25vh"//small phone

            if (window.innerHeight >= 600 && window.innerHeight <= 850 && window.innerWidth < 1000) return "30vh"//large phone

            if (window.innerHeight > 850) return "170px" //large desktop

            return "60px" //laptop

        case "right":

            if (window.innerWidth < 1000) return "0px"

            if (window.innerWidth > 1500) return "35vw"

            return "28vw"

        default: return ""

    }

}

export default handle_next_click