import React from "react"

import classes from "./Small_donut.module.css"

//external
import colours from "../../../../Util/Colours"

const Small_donut = props => {

    return (

        <div className={[classes.donutContainer, classes.css].join(" ")}>
            
            <svg width={props.size} height={props.size} xmlns="http://www.w3.org/2000/svg">
                <g>
                
                {[
                    ["#d3d3d3", props.offsets[0], props.size], 
                    [colours.green, props.offsets[1], props.size], 
                    [colours.orange, props.offsets[2], props.size], 
                    [colours.red, props.offsets[3], props.size]
                ]

                .map((circle) => 
                
                <circle id="circle" key={circle[0]}

                style={{ strokeDashoffset: circle[1], strokeDasharray:props.circumference}} 
                className={classes.donut} 
                r={props.r} cy={props.c} cx={props.c} 
                strokeWidth="10" 
                stroke={circle[0]} 
                fill="none" 

                />)}
                

                </g>
            </svg>

            <div className={classes.percent} style={{height:`${props.size}px`, width:`${props.size}px`}}>

                <span style={{color: colours.blue}}>{Math.round(props.total_percent)}</span><span className={classes.modulus} style={{color:colours.blue}}>%</span>

            </div>

        </div>

    )

}

export default Small_donut