import React from "react"

import classes from "./Progress_circles.module.css"
import colours from "../../../../Util/Colours"

const Progress_circles = props => {

    return (

        <div className={classes.container}>

            {[1,2].map(circle_number => <div key={circle_number} className={classes.circle} style={{backgroundColor: props.active_page === circle_number ? colours.blue : null, border: `1px solid ${colours.dark_blue}`}}></div>)}

        </div>

    )

}

export default Progress_circles