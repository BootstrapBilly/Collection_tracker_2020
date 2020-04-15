import {SUCCESS, IN_USE, DB_ERROR, CLEAR_LAST} from "../Actions/Add_book_action"

const initialState = {//set the initial state

    last_book_added:null,
    error:null

}

const intro = (state = initialState, action) => {

    switch (action.type) {

        case SUCCESS:return {...state, last_book_added:action.payload, error:null}
        case IN_USE:return {...state, error:`You already have ${action.payload.year} in ${action.payload.condition} condition`}
        case DB_ERROR:return {...state, error:"Database error, please contact administrator"}
        case CLEAR_LAST:return {...state, last_book_added:null, error:null}

        default:return state;
    }

}

export default intro

