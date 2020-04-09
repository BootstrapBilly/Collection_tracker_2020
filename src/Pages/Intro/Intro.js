import React from "react"

import classes from "./Intro.module.css"

//Internal
import ProgressCircles from "./Components/Progress_circles/Progress_circles"
import Button from "./Components/Button/Button"

//Assets
import devices from "../../Assets/Icons/devices.svg"

const Intro = props => {

    return (

        <div className={classes.container}>

            <div className={classes.graphics_container}>

                <img className={classes.graphics} src={devices} alt={"Mobile, tablet and computer"} />

            </div>

            <div className={classes.paragraph_container}>

                    <span className={classes.paragraph}>Manage your collection from your mobile, tablet or computer.</span>

            </div>

            <div className={classes.button_container}>

                    <Button text="Next" />

            </div>

            <div className={classes.circle_container}>

                <ProgressCircles active_page={1}/>
                
            </div>

        </div>

    )

}

export default Intro