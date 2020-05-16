//1st param = type of tutorial, written into local storage, e.g. "first" or "dashboard"
//2nd param = state object, passed in by components which is a combined megastate (form)
//3rd param = setstate, used to update the state in the parent component

const handle_tutorial_completion = (type, state, set_state) => {
        
    window.localStorage.setItem(`${type}_tutorial_completed`, true)//save variable into local storage

    !state ? set_state(true)//if the parent does not have a combined megastate, update it using the hook

    : set_state({ ...state, tutorial_completed: true })//if it does, update it using this

}

export default handle_tutorial_completion