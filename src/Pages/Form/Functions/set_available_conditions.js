import send_request from "../../../Util/SendRequest"//util method for sending API requests

const set_conditions = async (year, set_available_conditions) => {

    let available_conditions = ["Poor", "Fair", "Mint"]//set all conditions

    const response = await send_request("get_conditions", { form_values: year })//check what conditions for the given year already exist in the database  

    const existing_conditions = response.data.conditions//store any existing conditions

    //!no conditions found
    if(!existing_conditions) return set_available_conditions(available_conditions)//if none exist, make all conditions available in the next step

    //*conditions found
    existing_conditions.forEach(existing_condition => {//if existing conditions were found, loop through the existing conditions

        available_conditions = available_conditions.filter(condition => existing_condition.toString() !== condition.toString())//removing them from the available conditions
            
    })

    if(!available_conditions.length) return false //if all conditions were taken, return false to not progress to the next step

    return set_available_conditions(available_conditions)//set the available conditions on the next step
    
}

export default set_conditions
