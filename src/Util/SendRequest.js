import axios from "axios"

const production = "http://localhost:4000/"

const sendPost = (url, body) => {

    if (typeof body !== "object" || body === null) return console.log("\nSENDPOSTREQ - INVALID PARAMETER SUPPLIED : \nThe body(second) parameter must be an object")

    return axios.post(`${production}${url}`,

        body
    )

}

export default sendPost