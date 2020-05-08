import send_request from "../../Util/SendRequest"

export const SUCCESS = "SUCCESS";
export const NOT_FOUND = "NOT_FOUND";
export const IN_USE = "IN_USE";
export const DB_ERROR = "DB_ERROR";
export const VALIDATION_FAILURE = "VALIDATION_FAILURE";
export const CLEAR_SUBMISSION_RESULT = "CLEAR_SUBMISSION_RESULT"

export const submit_form = (form_values, url, type) => {

    let request = send_request(url, { form_values: form_values }) 

    if(type) {request = send_request(url, {form_values: form_values}, type)}

    return async dispatch => {

        try {

            const response = await request      
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

export const clear_submission_result = () => {

    return async dispatch => {
        
        return dispatch({ type: CLEAR_SUBMISSION_RESULT })
    }
}

