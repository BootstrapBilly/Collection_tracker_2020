import {INTRO_COMPLETED} from "../Actions/intro_action"

const initialState = {//set the initial state

    intro_completed: false

}

const intro = (state = initialState, action) => {

    switch (action.type) {

        case INTRO_COMPLETED:return {...state, intro_completed:true}

        default:return state;
    }

}

export default intro

