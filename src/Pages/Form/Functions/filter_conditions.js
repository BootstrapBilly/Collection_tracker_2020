import send_request from "../../../Util/SendRequest"//util method for sending API requests

const filter_conditions = async (state) => {

    let available_conditions = ["Poor", "Fair", "Mint"]//set all conditions

    const response = await send_request("get_conditions", { form_values: state.year })//check what conditions for the given year already exist in the database  

    const existing_conditions = response.data.conditions//store any existing conditions

    //!no conditions found
    if(!existing_conditions) return available_conditions //return all conditions

    //*conditions found
    existing_conditions.forEach(existing_condition => {//if existing conditions were found, loop through the existing conditions

        available_conditions = available_conditions.filter(condition => existing_condition.toString() !== condition.toString())//removing them from the available conditions
            
    })

    if(!available_conditions.length) return false //if all conditions were taken, return false to not progress to the next step

    return available_conditions//otherwise return the filtered conditions
    
}

export default filter_conditions
