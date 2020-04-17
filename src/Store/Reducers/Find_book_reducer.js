import {SUCCESS, NOT_FOUND, DB_ERROR} from "../Actions/Find_book_action"

const initialState = {//set the initial state

    search_result:{year:null, condition:null},
    error:null

}

const intro = (state = initialState, action) => {

    switch (action.type) {

        case SUCCESS:return {...state, search_result:action.payload, error:null}
        case NOT_FOUND:return {...state, error:`${action.payload} was not found.`, search_result:{year:null, condition:null}}
        case DB_ERROR:return {...state, error:"Database error, please contact administrator", search_result:{year:null, condition:null}}

        default:return state;
    }

}

export default intro

