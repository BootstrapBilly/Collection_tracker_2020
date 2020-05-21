export const SET_ROUTE = "SET_ROUTE";

export const set_route = route => {

    return async dispatch => {

        return dispatch({type:SET_ROUTE, payload: route})

    }

}



