import React from 'react'

import classes from "./Donut_tutorial.module.css"

//components
import Tutorial from "../../../../Shared Components/Tutorial/Tutorial"

export const Donut_tutorial = () => {

    return (

        <div className={classes.container}>

            <Tutorial text={["This is your bookshelf", "Books you own are highlighted, while missing books are greyed out."]} handle_okay_click={() => handle_okay_click("initial", "search")} />

        </div>

    )

}

export default Donut_tutorial