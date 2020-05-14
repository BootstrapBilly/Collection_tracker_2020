import {SUCCESS, NOT_FOUND, IN_USE, DB_ERROR, VALIDATION_FAILURE, CLEAR_FORM_SUBMISSION_RESPONSE} from "../Actions/Submit_form_action"

const initialState = {//set the initial state
    submission_result:null
}

const intro = (state = initialState, action) => {

    switch (action.type) {

        case SUCCESS:return {...state, submission_result:{success:true, details:action.payload}}
        case NOT_FOUND:return {...state, submission_result:{error:`Not_found`, details: action.payload}}
        case IN_USE:return {...state, submission_result:{error:`In_use`, details: action.payload}}
        case VALIDATION_FAILURE:return {...state, submission_result:{info:`Validation_failure`, details: action.payload}}
        case DB_ERROR:return {...state, submission_result:{error:"Db_error"}}
        case CLEAR_FORM_SUBMISSION_RESPONSE:return {...state, submission_result:null}

        default:return state;
    }

}

export default intro

