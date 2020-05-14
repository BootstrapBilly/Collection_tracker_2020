/* Check the current step, then respond accordingly */
import Alert from "easyalert"

const handle_next_click = async (current_step, set_current_step, year, selected_condition, set_available_conditions, dispatch, submit_form, set_selected_condition, form_type, uploaded_image) => {

    const year_is_valid = parseInt(year) > 1954 && parseInt(year) < new Date().getFullYear() + 1 //if the year is between 1955 and the current year
    
    switch (form_type) {

        //?Add
        case "Add": //if the form is the add book form @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            //_year
            if (current_step === "year") {//and the current step is year

                //*validation pass

                if (year_is_valid) { //if a valid year was given

                    /*call the set available condition functions, (found in the functions folder)
                        which sends removes any conditions which are in use before they get rendered on the next screen
                    */
                    const available_conditions = await set_available_conditions(year, set_selected_condition)

                    if (available_conditions === false) {//if all conditions are taken, do not progress to the next step
                        //and return an alert informing the user
                    return Alert(`You have this book in all conditions`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })}

                    //Otherwise set the available conditions on the next page
                    else set_available_conditions(year, set_selected_condition)//located in the functions folder
                    .then(r => set_current_step("condition"))//After they have been set, load the page

                }

                //!Validation failure

                //if they entered invalid data, do not progress and inform them
                else {

                    return Alert(`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })//set the validation error
                }

            }

            //_condition

            if (current_step === "condition") return set_current_step("photo")//if a condition is selected, progress to the final step


            //_Add book

            //last page submits the form with the selected year and condition
            if (current_step === "photo") return dispatch(submit_form({ year: year, condition: selected_condition, url:uploaded_image || null }, "add_book"))

            break;

        //?Search

        case "Search"://if it is a search form @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        if(year_is_valid) return dispatch(submit_form(year, "search_for_book")) //If the input is valid, submit the form

        //otherwise do not submit the form and show an alert
        else return Alert(`Please enter a year between 1955 and ${new Date().getFullYear()}`, "error", { bottom: handle_offset("bottom"), right: handle_offset("right") })

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

            if (window.innerWidth < 1000) return "0px" //smaller than desktop

            if (window.innerWidth > 1500) return "35vw"//large desktop

            return "28vw"//laptop

        default: return ""

    }

}

export default handle_next_click