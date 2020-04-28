const set_prompt_message = (current_step) => {

    if(current_step === "year") return "What's the year of the book?"
    if(current_step === "condition") return "What condition is it in?"
    else return "Would you like to add a photo ? (Optional)"
    
}

export default set_prompt_message