import {clear_form_submission_response} from "../../../Store/Actions/Submit_form_action"

const reset_form = (dispatch, props, state, set_state, type) => {

    dispatch(clear_form_submission_response())//clear the response data from the reducer
    set_state({...state, current_step:"year"}) 

    if (type && type.prepopulate) {

        set_state({...state, current_step: "year", year:props.location.state.year})//set the current step to year and prepopulate the input with the given year
        props.history.replace()//clear the navigation data (cleanup)

    }

    else {//if its not a prepopulate reset

        set_state({...state, //reset the form and all inputs
            year:null,
            condition:null,
            current_step:"year"
        }) 

    }

}

export default reset_form