import React from "react"
import classes from "./Option.module.css"

//external
import { Link } from "react-router-dom"

const Option = props => {

    return (

        <Link to={props.to} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>

            <img className={classes.icon} src={props.src} alt={props.alt} onClick={props.handleClick} />

        </Link>

    )

}

export default Option