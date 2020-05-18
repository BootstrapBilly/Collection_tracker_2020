import React from 'react'

import classes from "./Cell.module.css"

import colours from "../../../../../../Util/Colours"

export const Cell = props => {

    const book_present = props.books.find(year => year === props.year) 

    return (

        <div className={classes.container} >

            <div className={classes.photo_container} onClick={props.on_click.bind(this, props.year)}>

                <img src={require(`../../../../../../Assets/Books/${props.year}.jpg`)} alt={props.year} className={classes.grid_image} />

            </div>

            {book_present ? null : <div className={classes.missing_overlay} onClick={props.on_click.bind(this, {year:props.year, missing:true})}></div>}

            <span className={classes.year} style={{color:colours.dark_blue}}>{props.year}</span>

        </div>

    )

}

export default Cell
