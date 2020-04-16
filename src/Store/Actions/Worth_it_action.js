import send_request from "../../Util/SendRequest"

export const SUCCESS = "SUCCESS";
export const DB_ERROR = "DB_ERROR";

export const worth_it_inquiry_action = form_values => {

    return async dispatch => {

        try {

            const response = await send_request("worth_buying", { year: form_values.year, condition: form_values.condition})
            if (response.status === 200) return dispatch({ type: SUCCESS, payload:response.data})

        }

        catch (error) {

            if (error.response.status === 500) return dispatch({ type: DB_ERROR })

        }

    }

}


