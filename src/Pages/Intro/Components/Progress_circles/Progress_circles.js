import React from "react"

import classes from "./Progress_circles.module.css"

const Progress_circles = props => {

    return (

        <div className={classes.container}>

            {[1,2].map(circle_number => <div key={circle_number} className={classes.circle} style={{backgroundColor: props.active_page === circle_number ? "#acacff" : null}}></div>)}

        </div>

    )

}

export default Progress_circles