import React, {useState} from 'react'

import classes from "./Grid_tutorial.module.css"

//components
import Tutorial from "../../../../Shared Components/Tutorial/Tutorial"

import {useDispatch} from "react-redux"

import {mark_completed} from "../../../../Store/Actions/Tutorial_action"

export const Grid_tutorial = () => {

    const [step, set_step] = useState("initial")

    const dispatch = useDispatch()

    const handle_okay_click = () => {

        window.localStorage.setItem("grid_tutorial", true)
        dispatch(mark_completed("grid"))
    }

    return (

            <div className={classes.container}>

                <Tutorial text={["This is your bookshelf.", "Books you own are highlighted, while missing books are greyed out."]} handle_okay_click={()=> handle_okay_click()}/>

            </div>

    )

}

export default Grid_tutorial