const inject_message_into_dom = (message, type, set_feedback_info) => {

    set_feedback_info([message, type])//set the validation error
    document.getElementById("root").insertBefore(document.getElementById("alert_container"), document.querySelector(".App"))

} 

export default inject_message_into_dom