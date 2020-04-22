export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";

export const reload_search_result_action = photo_url => {

    return async dispatch => {

        return dispatch({ type: UPLOAD_SUCCESS, payload:photo_url})

    }

}

export const handle_upload_error_action = error => {

    return async dispatch => {

        return dispatch({ type: UPLOAD_FAILURE, payload:error})

    }

}

