const handle_back_click = (current_step, set_current_step) => {

    /*Check the current step of the form, then set it accordingly*/

    if (current_step === "condition") return set_current_step("year")

    else return set_current_step("condition")

}

export default handle_back_click