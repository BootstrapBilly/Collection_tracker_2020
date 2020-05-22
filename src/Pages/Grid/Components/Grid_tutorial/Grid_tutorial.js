import React, { useState } from 'react'

import classes from "./Grid_tutorial.module.css"

//components
import Tutorial from "../../../../Shared Components/Tutorial/Tutorial"

import { useDispatch, useSelector } from "react-redux"

import { mark_completed } from "../../../../Store/Actions/Tutorial_action"

export const Grid_tutorial = () => {


    const initial_completed = useSelector(state => state.tutorial.initial)
    const search_completed = useSelector(state => state.tutorial.search)
    const add_completed = useSelector(state => state.tutorial.add)

    console.log(search_completed)

    const find_current_step = () => {

        if(!initial_completed) return "initial"
        if(initial_completed && !search_completed) return "search"
        if(initial_completed && search_completed && !add_completed) return "add"
    }

    //?selectors
    const [step, set_step] = useState(find_current_step)

    const dispatch = useDispatch()

    const handle_okay_click = (step, next_step) => {

        if(next_step === "all_grid_completed"){

            window.localStorage.setItem(`add_tutorial`, true)
            window.localStorage.setItem(`all_grid_tutorial`, true)
            dispatch(mark_completed(step))
        }

        window.localStorage.setItem(`${step}_tutorial`, true)
        dispatch(mark_completed(step))

        set_step(next_step)
    }

    return (

        <div className={classes.container}>

            {step === "initial" ?

                <Tutorial text={["This is your bookshelf", "Books you own are highlighted, while missing books are greyed out."]} handle_okay_click={() => handle_okay_click("initial", "search")} test_handle="initial" />
            
                : step === "search" ? <Tutorial text={["You can use this bar to search for a book."]} handle_okay_click={() => handle_okay_click("search", "add")} test_handle="search" />

                : step === "add" && <Tutorial text={["Adding new books :", "You can click on a missing book. Alternatively, you can click the icon."]} handle_okay_click={() => handle_okay_click("add", "all_grid_completed")} test_handle="add" />

    }
        </div>

    )

}

export default Grid_tutorial