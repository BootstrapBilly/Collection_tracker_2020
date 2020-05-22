export const MARK_INITIAL_COMPLETED = "MARK_INITIAL_COMPLETED";
export const MARK_SEARCH_COMPLETED = "MARK_SEARCH_COMPLETED";
export const MARK_ADD_COMPLETED = "MARK_ADD_COMPLETED";
export const MARK_DONUT_COMPLETED = "MARK_DONUT_COMPLETED";
export const MARK_FORM_COMPLETED = "MARK_FORM_COMPLETED";

export const mark_completed = tutorial => {

    return async dispatch => {

        if(tutorial === "initial"){
            return dispatch({type:MARK_INITIAL_COMPLETED})
        }

        if(tutorial === "search"){
            return dispatch({type:MARK_SEARCH_COMPLETED})
        }

        if(tutorial === "add"){
            return dispatch({type:MARK_ADD_COMPLETED})
        }     

        if(tutorial === "donut"){
            return dispatch({type:MARK_DONUT_COMPLETED})
        }     

        if(tutorial === "form"){
            return dispatch({type:MARK_FORM_COMPLETED})
        }     

    }

}



