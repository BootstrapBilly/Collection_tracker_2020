import React from "react"

import classes from "./Alert.module.css"

//util
import colours from "../../Util/Colours"

//assets
import error from "../../Assets/Icons/error.svg"
import info from "../../Assets/Icons/info.svg"
import success from "../../Assets/Icons/success.svg"


const Alert = props => {

    return (

        <div className={classes.container} style={{ display: props.type === "hidden" ? "none" : "flex" }} id="alert_container">

            <div className={classes.inner_container}>

                <div className={classes.icon_container} style={{ backgroundColor: props.type === "error" ? colours.red : props.type === "info" ? colours.orange : props.type === "success" ? colours.green : null }}>

                    <img className={classes.icon} src={props.type === "error" ? error : props.type === "info" ? info : props.type === "success" ? success : null} alt={"An icon"} />

                </div>

                <div className={classes.message_container}>{props.message} </div>
            
            </div>

        </div>

    )

}

export default Alert