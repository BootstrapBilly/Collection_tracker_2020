
//Parameter should be an array of localstorage variables to clear
const reset_tutorial = (types, set_reload_tutorial) => {


    types.forEach(type => {

        window.localStorage.removeItem(`${type}_tutorial`)

    })

    // window.location.reload()
    set_reload_tutorial(true)
}

export default reset_tutorial