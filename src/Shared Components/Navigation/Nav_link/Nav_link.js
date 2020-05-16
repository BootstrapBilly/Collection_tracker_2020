import React from "react"
import classes from "./Nav_link.module.css"

//external
import { Link } from "react-router-dom"

const Navlink = props => {

    return (

        <div className={[classes.container, props.additional_class].join(" ")} test_handle={props.test_handle}>

            <Link to={props.to} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>

                <img className={classes.icon} src={props.src} alt={props.alt} onClick={props.handleClick} onMouseDown={props.onClick}/>
                
                <p>{props.text}</p>

            </Link>

        </div>

    )

}

export default Navlink