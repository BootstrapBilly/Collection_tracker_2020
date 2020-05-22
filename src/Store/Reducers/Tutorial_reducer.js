import {MARK_INITIAL_COMPLETED, MARK_SEARCH_COMPLETED, MARK_ADD_COMPLETED, MARK_DONUT_COMPLETED, MARK_FORM_COMPLETED} from "../Actions/Tutorial_action"

const initialState = {//set the initial state

    //grid
    initial:window.localStorage.getItem("initial_tutorial"),
    search:window.localStorage.getItem("search_tutorial"),
    add:window.localStorage.getItem("add_tutorial"),
    all_grid:window.localStorage.getItem("all_grid_tutorial"),

    //donut
    donut:window.localStorage.getItem("donut_tutorial"),

    //form
    form:window.localStorage.getItem("form_tutorial")
}

const fetch_books = (state = initialState, action) => {

    switch (action.type) {

        case MARK_INITIAL_COMPLETED:return {...state, initial:true}
        case MARK_SEARCH_COMPLETED:return {...state, search:true}
        case MARK_ADD_COMPLETED:return {...state, add:true, all_grid:true}
        case MARK_DONUT_COMPLETED:return {...state, donut:true}
        case MARK_FORM_COMPLETED:return {...state, form:true}

        default:return state;
    }

}

export default fetch_books

