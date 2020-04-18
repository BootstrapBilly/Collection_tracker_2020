import send_request from "../../Util/SendRequest"

export const BOOKS_FOUND = "BOOKS_FOUND";
export const NOT_FOUND = "NOT_FOUND";
export const DB_ERROR = "DB_ERROR";


export const fetch_books = () => {

    return async dispatch => {

        try {

            const response = await send_request("fetch_books", {}, "get")   
            if (response.data.success) return dispatch({ type: BOOKS_FOUND, payload: response.data.books })

        }

        catch (error) {
           // if (error.response.status === 404) return dispatch({ type: NOT_FOUND })
           // if (error.response.status === 500) return dispatch({ type: DB_ERROR })

        }

    }

}



