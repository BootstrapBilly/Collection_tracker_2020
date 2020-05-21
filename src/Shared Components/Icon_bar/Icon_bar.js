import React, { useState } from 'react'

import classes from "./Icon_bar.module.css"

//components
import Icon from "./Components/Icon/Icon"

//external
import { Link } from "react-router-dom"

//assets
import donut from "../../Assets/Icons/donut.svg"
import grid from "../../Assets/Icons/grid.svg"
import add from "../../Assets/Icons/add.svg"

export const Icon_bar = props => {

    const [active_icon, set_active_icon] = useState(props.active_icon)

    return (

        <div className={classes.container}>

            <Link to={"/"} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>

                <Icon src={grid} alt="Grid icon" type={"grid"} text="All Books" handle_icon_click={() => set_active_icon("grid") } active_icon={active_icon}

                />

            </Link>

            <Link to={"/donut"} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>

                <Icon src={donut} alt="Donut icon" type={"donut"} text="Conditions" handle_icon_click={() =>  set_active_icon("donut") } active_icon={active_icon}
    
                />
            </Link>

            <Link to={{pathname: "/add_book", state: {redirected_from_nav:true}}} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>

                <Icon src={add} alt="add icon" type={"add"} text="Add Book" handle_icon_click={() => set_active_icon("add") } active_icon={active_icon} />

            </Link>

        </div>

    )

}

export default Icon_bar
