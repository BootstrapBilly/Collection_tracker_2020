import React, { useState, useEffect } from 'react'

import classes from "./Tutorial.module.css"

//components
import CLICK_PREVENTION_OVERLAY from "../Click_prevention_overlay/Click_prevention_overlay"

//util
import colours from "../../Util/Colours"

export const Dashboard_tutorial = props => {

    const [timer_finished, set_timer_finished] = useState(false)

    useEffect(() => {//This is used to display the prompt after 3 seconds

        setTimeout(() => {

            !timer_finished && set_timer_finished(true)

        }, 2000);

    }, [timer_finished])

    return (

        <React.Fragment>

            <CLICK_PREVENTION_OVERLAY />

            {timer_finished &&

                <div className={classes.prompt_wrapper} test_handle={`${props.test_handle}_tutorial`}>

                    <div className={classes.prompt_container}>

                        {props.text.map((text) => <p className={classes.prompt_text} style={{ color: colours.dark_blue }}>{text}</p>)}

                        <div test_handle="tutorial_next_button" className={classes.button} style={{ backgroundColor: colours.dark_blue }} 
                        onClick={props.handle_okay_click}>Okay</div>

                    </div>

                    <div className={classes.overlay}></div>

                </div>

            }

        </React.Fragment>

    )

}

export default Dashboard_tutorial
