import React from 'react'

import classes from "./Cell.module.css"

import colours from "../../../../../../Util/Colours"

export const Cell = props => {

    return (

        <div className={classes.container} >

            <div className={classes.photo_container} onClick={props.on_click.bind(this, props.year)}>

                <img src={require(`../../../../../../Assets/Books/${props.year}.jpg`)} alt={props.year} className={classes.grid_image} />

            </div>

            {props.books.find(year => year === props.year) ? null : <div className={classes.missing_overlay} onClick={props.on_click.bind(this, props.year)}></div>}

            <span className={classes.year} style={{color:colours.dark_blue}}>{props.year}</span>

        </div>

    )

}

export default Cell
