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
import question from "../../Assets/Icons/question.svg"

//redux hooks
import { useSelector } from "react-redux"

export const Icon_bar = props => {

    const search_completed = useSelector(state => state.tutorial.search)
    const all_grid_completed = useSelector(state => state.tutorial.all_grid)

    const [active_icon, set_active_icon] = useState(props.active_icon)

    return (

        <div className={classes.container}>

            <div className={classes.tutorial_overlay} style={{ display: search_completed && !all_grid_completed ? "block" : "none" }}></div>

            {/* All books icon*/}
            <Link to={"/"} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>

                <Icon src={grid} alt="Grid icon" type={"grid"} text="All Books" handle_icon_click={() => set_active_icon("grid")} active_icon={active_icon}
                    test_handle={"grid_icon"} />

            </Link>

            {/* conditions icon*/}
            <Link to={"/donut"} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>

                <Icon src={donut} alt="Donut icon" type={"donut"} text="Conditions" handle_icon_click={() => set_active_icon("donut")} active_icon={active_icon}
                    test_handle={"donut_icon"} />

            </Link>

            {//Add book icon

                all_grid_completed ? //if all grid tutorials have been completed

                //Display a link icon
                    <Link to={{ pathname: "/add_book", state: { redirected_from_nav: true } }} test-handle={props.test_handle} style={{ textDecoration: 'none', zIndex: "90000000000" }}>

                        <Icon src={add} alt="add icon" type={"add"} text="Add Book" handle_icon_click={() => set_active_icon("add")} active_icon={active_icon}
                            apply_tutorial={search_completed && !all_grid_completed ? true : false} test_handle={"add_book_icon"}
                        />

                    </Link>

                    :
                    //Otherwise, display an icon with no link, so they cant click out of the tutorial
                    <Icon src={add} alt="add icon" type={"add"} text="Add Book" handle_icon_click={() => set_active_icon("add")} active_icon={active_icon}
                        apply_tutorial={search_completed && !all_grid_completed ? true : false} test_handle={"add_book_icon"} />
            }

            {/* Help icon*/}
            <Icon src={question} alt="help icon" type={"help"} text="Help" handle_icon_click={props.on_help_click} active_icon={active_icon} />


        </div>

    )

}

export default Icon_bar
