import send_request from "../../Util/SendRequest"

export const SUCCESS = "SUCCESS";
export const NOT_FOUND = "NOT_FOUND";
export const IN_USE = "IN_USE";
export const DB_ERROR = "DB_ERROR";
export const VALIDATION_FAILURE = "VALIDATION_FAILURE";
export const CLEAR_FEEDBACK = "CLEAR_FEEDBACK"

export const submit_form = (form_values, url) => {

    console.log(form_values)

    return async dispatch => {

        try {

            const response = await send_request(url, { form_values: form_values })        
            if (response.data.success) return dispatch({ type: SUCCESS, payload: response.data })

        }

        catch (error) {
            if (error.response.status === 404) return dispatch({ type: NOT_FOUND, payload: form_values })
            if (error.response.status === 409) return dispatch({ type: IN_USE, payload: form_values })
            if (error.response.status === 500) return dispatch({ type: DB_ERROR })

        }

    }

}

export const handle_validation_failure = (error_message) => {

    return async dispatch => {

        return dispatch({ type: VALIDATION_FAILURE, payload:error_message })
    }

}

export const clear_feedback = () => {

    return async dispatch => {

        return dispatch({ type: CLEAR_FEEDBACK })
    }
}

