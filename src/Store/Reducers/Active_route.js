import {SET_ROUTE} from "../Actions/Active_route"

const initialState = {//set the initial state
    route:"grid"
}

const set_route = (state = initialState, action) => {

    switch (action.type) {

        case SET_ROUTE:return {...state, route:action.payload}

        default:return state;
    }

}

export default set_route

