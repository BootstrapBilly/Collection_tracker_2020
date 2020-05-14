import send_request from "../../Util/SendRequest"

export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";

export const reload_search_result_action = photo_url => {

    return async dispatch => {

        return dispatch({ type: UPLOAD_SUCCESS, payload: photo_url })

    }

}

export const set_url_in_database = form_values => {

    return async dispatch => {

        try {

            const response = await send_request("set_image_url", {form_values:form_values })   
            if (response.data.success) return dispatch({ type: UPLOAD_SUCCESS, payload: form_values.url})

        }

        catch (error) {

            // if (error.response.status === 404) return dispatch({ type: NOT_FOUND, payload: form_values })
            // if (error.response.status === 409) return dispatch({ type: IN_USE, payload: form_values })
            // if (error.response.status === 500) return dispatch({ type: DB_ERROR })

        }

    }

}

export const handle_upload_error_action = error => {

    return async dispatch => {

        return dispatch({ type: UPLOAD_FAILURE, payload: error })

    }

}

