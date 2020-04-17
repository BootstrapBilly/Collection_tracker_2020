import {SUCCESS, NOT_FOUND, IN_USE, DB_ERROR, CLEAR_FEEDBACK} from "../Actions/Submit_form_action"

const initialState = {//set the initial state
    submission_result:null
}

const intro = (state = initialState, action) => {

    switch (action.type) {

        case SUCCESS:return {...state, submission_result:{success:true, details:action.payload}}
        case NOT_FOUND:return {...state, submission_result:{error:`Not_found`, details: action.payload}}
        case IN_USE:return {...state, submission_result:{error:`In_use`, details: action.payload}}
        case DB_ERROR:return {...state, submission_result:{error:"Db_error"}}
        case CLEAR_FEEDBACK:return {...state, submission_result:null}

        default:return state;
    }

}

export default intro

