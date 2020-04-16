import send_request from "../../Util/SendRequest"

export const SUCCESS = "SUCCESS";
export const NOT_FOUND = "NOT_FOUND";
export const DB_ERROR = "DB_ERROR";
//export const CLEAR_LAST = "CLEAR_LAST";

export const find_book_action = year => {

    return async dispatch => {

        try {

            const response = await send_request("search_for_book", { year: year})

            if (response.status === 200) return dispatch({ type: SUCCESS, payload:response.data.book})

        }

        catch (error) {

            if (error.response.status === 404) return dispatch({ type: NOT_FOUND, payload:year})
            if (error.response.status === 500) return dispatch({ type: DB_ERROR })

        }

    }

}

// export const clear_last_added_book_action = () => {

//     return async dispatch => {

//         return dispatch({ type: CLEAR_LAST })
//     }
// }

