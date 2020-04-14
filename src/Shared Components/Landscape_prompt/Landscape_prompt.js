import React from "react"

import classes from "./Landscape_prompt.module.css"

//assets
import rotate from "../../Assets/Icons/rotate.svg"

//util
import colours from "../../Util/Colours"

const Landscape_prompt = props => {

    return (

        <div className={classes.container}>

            <img className={classes.image} src={rotate} alt={"A mobile phone"} />

            <div className={classes.text_container}>
                <span className={classes.ohno} style={{ color: colours.dark_blue }}>Oh No!</span>
                <span className={classes.text}>Please rotate your device to avoid keyboard issues!</span>
            </div>

        </div>

    )

}

export default Landscape_prompt