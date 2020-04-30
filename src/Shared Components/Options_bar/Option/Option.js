import React from "react"
import classes from "./Option.module.css"

//external
import { Link } from "react-router-dom"

const Option = props => {

    return (

        <div className={classes.container} test_handle={props.test_handle}>

            <Link to={props.to} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>

                <img className={classes.icon} src={props.src} alt={props.alt} onClick={props.handleClick} onMouseDown={props.onClick}/>
                <p>{props.text}</p>

            </Link>

        </div>

    )

}

export default Option