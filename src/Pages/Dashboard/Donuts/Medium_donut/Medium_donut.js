import React from "react"

import classes from "./Medium_donut.module.css"

//external
import colours from "../../../../Util/Colours"

const Medium_donut = props => {

    return (

        <div className={[classes.donutContainer, classes.css, props.className].join(" ")}>
            <svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <title>50</title>
                    <circle id="circle" style={{ strokeDashoffset: "0" }} className={classes.donut} r="100" cy="127" cx="127" stroke-width="10" stroke="#d3d3d3" fill="none" />
                    <circle id="circle" style={{ strokeDashoffset: "300" }} className={classes.donut} r="100" cy="127" cx="127" stroke-width="10" stroke={colours.green} fill="none" />
                    <circle id="circle" style={{ strokeDashoffset: "550" }} className={classes.donut} r="100" cy="127" cx="127" stroke-width="10" stroke={colours.orange} fill="none" />
                    <circle id="circle" style={{ strokeDashoffset: "600" }} className={classes.donut} r="100" cy="127" cx="127" stroke-width="10" stroke={colours.red} fill="none" />
                </g>
            </svg>

            <div className={classes.percent}>

                <span>50</span><span className={classes.modulus}>%</span>

            </div>

        </div>

    )

}

export default Medium_donut