import {clear_form_submission_response} from "../../../Store/Actions/Submit_form_action"

const reset_form = (dispatch, set_current_step, set_year, props, set_selected_condition, type) => {

    dispatch(clear_form_submission_response())//clear the response data from the reducer
    set_current_step("year")//set the step back to year

    if (type && type.prepopulate) {

        set_year(props.location.state.year)//Prepopulate the year input with the missing year they was redirected from
        props.history.replace()//clear the navigation data (cleanup)

    }

    else {

        set_year(null)//clear the year value (state)
        set_selected_condition(null)//clear the condition value (state)

    }

}

export default reset_form