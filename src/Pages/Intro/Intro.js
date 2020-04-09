import React from "react"

import classes from "./Intro.module.css"

//Internal
import ProgressCircles from "./Components/Progress_circles/Progress_circles"
import Button from "./Components/Button/Button"

//Assets
import devices from "../../Assets/Icons/devices.svg"
import features from "../../Assets/Icons/features.svg"

const Intro = props => {

    return (

        <div className={classes.container}>

            <div className={classes.graphics_container}>

                <img className={classes.graphics} src={props.page === 1 ? devices : features} alt={"Mobile, tablet and computer"} />

            </div>

            <div className={classes.paragraph_container}>

                    <span className={classes.paragraph}>

                        {props.page === 1 ? "Manage your collection from your mobile, tablet or computer." 
                        : "Keep your collection organised with minimal effort."}

                    </span>

            </div>

            <div className={classes.button_container}>

                    <Button text={props.page === 1 ? "More Info" : "Get Started"} onClick={props.handle_button_click.bind(this, props.page)}/>

            </div>

            <div className={classes.circle_container}>

                <ProgressCircles active_page={props.page === 1 ? 1 : 2}/>
                
            </div>

        </div>

    )

}

export default Intro