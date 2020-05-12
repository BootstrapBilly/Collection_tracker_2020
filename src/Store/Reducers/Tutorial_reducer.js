import {MARK_COMPLETED} from "../Actions/Tutorial_action"

const initialState = {//set the initial state
    completed:false
}

const tutorial = (state = initialState, action) => {

    switch (action.type) {

        case MARK_COMPLETED:return {...state, completed:true}

        default:return state;
    }

}

export default tutorial

