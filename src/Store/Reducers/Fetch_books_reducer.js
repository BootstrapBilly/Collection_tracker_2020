import {BOOKS_FOUND, NOT_FOUND, DB_ERROR} from "../Actions/Fetch_books_action"

const initialState = {//set the initial state
    books:null
}

const fetch_books = (state = initialState, action) => {

    switch (action.type) {

        case BOOKS_FOUND:return {...state, books:action.payload}
        case NOT_FOUND:return {...state, books:null}
        case DB_ERROR:return {...state, books:null}

        default:return state;
    }

}

export default fetch_books

