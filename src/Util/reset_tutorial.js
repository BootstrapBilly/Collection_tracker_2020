
//Parameter should be an array of localstorage variables to clear
const reset_tutorial = (types) => {


    types.forEach(type => {

        window.localStorage.removeItem(`${type}_tutorial`)

    })

    window.location.reload()
}

export default reset_tutorial