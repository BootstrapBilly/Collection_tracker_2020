export const INTRO_COMPLETED = "INTRO_COMPLETED";

export const mark_intro_completed = () => {

    return async dispatch => {

        console.log("reached action")

        dispatch({ 

            type: INTRO_COMPLETED,
            message:"big tings"
            
        })

    }

}

