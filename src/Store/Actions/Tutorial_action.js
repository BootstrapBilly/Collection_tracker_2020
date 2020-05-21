export const MARK_GRID_COMPLETED = "MARK_GRID_COMPLETED";

export const mark_completed = tutorial => {

    return async dispatch => {

        if(tutorial === "grid"){
            return dispatch({type:MARK_GRID_COMPLETED})
        }
        

    }

}



