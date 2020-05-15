const handle_back_click = (state, set_state) => {

    /*Check the current step of the form, then set it accordingly*/

    if (state.current_step === "condition") return set_state({...state, current_step:"year"})

    else set_state({...state, current_step:"condition"})

}

export default handle_back_click