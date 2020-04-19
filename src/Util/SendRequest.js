import axios from "axios"

//const production = "http://localhost:4000/"
const production = "https://collection-tracker-app.herokuapp.com/"

const sendPost = (url, body, type) => {

    if(type === "get") return axios.get(`${production}${url}`)

    if (typeof body !== "object" || body === null) return console.log("\nSENDPOSTREQ - INVALID PARAMETER SUPPLIED : \nThe body(second) parameter must be an object")

    return axios.post(`${production}${url}`,

        body
    )

}

export default sendPost