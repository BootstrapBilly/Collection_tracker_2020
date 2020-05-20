import React from 'react'

import classes from "./Page_transition.module.css"

export const Page_transition = () => {

    return (

        <React.Fragment>
            
            <div className={[classes.block, classes.one].join(" ")}></div>
            <div className={[classes.block, classes.two].join(" ")}></div>
            <div className={[classes.block, classes.three].join(" ")}></div>
        
        </React.Fragment>
    )

}

export default Page_transition