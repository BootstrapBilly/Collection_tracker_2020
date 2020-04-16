import send_request from "../../Util/SendRequest"

export const SUCCESS = "SUCCESS";
export const IN_USE = "IN_USE";
export const DB_ERROR = "DB_ERROR";
export const CLEAR_LAST = "CLEAR_LAST";

export const add_book_action = form_values => {

    return async dispatch => {

        try {

            const response = await send_request("add_book", { year: form_values.year, condition: form_values.condition})
            if (response.status === 201) return dispatch({ type: SUCCESS, payload:form_values})

        }

        catch (error) {

            if (error.response.status === 409) return dispatch({ type: IN_USE, payload:form_values })
            if (error.response.status === 500) return dispatch({ type: DB_ERROR })

        }

    }

}

export const clear_last_added_book_action = () => {

    return async dispatch => {

        return dispatch({ type: CLEAR_LAST })
    }
}

