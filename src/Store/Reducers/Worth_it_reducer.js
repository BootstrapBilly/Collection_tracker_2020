import {SUCCESS, DB_ERROR} from "../Actions/Add_book_action"

const initialState = {//set the initial state

    inquiry_result:null,
    error:null

}

const intro = (state = initialState, action) => {

    switch (action.type) {
        case SUCCESS:return {...state, inquiry_result:{result:action.payload.worth_buying, reason:action.payload.message}, error:null}
        case DB_ERROR:return {...state, error:"Database error, please contact administrator"}

        default:return state;
    }

}

export default intro

