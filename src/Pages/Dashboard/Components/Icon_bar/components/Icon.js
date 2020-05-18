import React from 'react'

import classes from "./Icon.module.css"

import colours from "../../../../../Util/Colours"


export const Icon = props => {

    return (

        <div className={classes.container} style={{ borderColor: props.current_graph === props.type && colours.blue}}>

            <img src={props.src} alt={props.alt} className={classes.icon}
                onClick={props.onClick.bind(this, props.type)}
                
            />

        </div>

    )

}

export default Icon