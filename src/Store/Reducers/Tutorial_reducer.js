import {MARK_GRID_COMPLETED} from "../Actions/Tutorial_action"

const initialState = {//set the initial state
    grid:window.localStorage.getItem("grid_tutorial")
}

const fetch_books = (state = initialState, action) => {

    switch (action.type) {

        case MARK_GRID_COMPLETED:return {...state, grid:true}

        default:return state;
    }

}

export default fetch_books

