import React from 'react'

import classes from "./Icon_bar.module.css"

//components
import Icon from "./Components/Icon/Icon"

//assets
import donut from "../../../../Assets/Icons/donut.svg"
import grid from "../../../../Assets/Icons/grid.svg"

export const Icon_bar = props => {

    return (

        <div className={classes.container}>

            <Icon src={grid} alt="Grid icon" current_graph={props.current_graph} type={"grid"}
                onClick={props.handle_select_icon}
            />

            <Icon src={donut} alt="Donut icon"  current_graph={props.current_graph} type={"donut"}
                onClick={props.handle_select_icon}
            />

        </div>

    )

}

export default Icon_bar
