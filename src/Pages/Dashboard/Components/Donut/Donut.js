import React from 'react'

import classes from "./Donut.module.css"

//components
import ConditionCard from "../Condition_card/Condition_card"

//external
import CanvasJSReact from "../../../../Assets/Charts/canvasjs.react"

//util
import colours from "../../../../Util/Colours"

export const Donut = props => {

    //`${Math.round((props.total_percent + Number.EPSILON) * 100) / 100}%`
    //-Config
    const CanvasJS = CanvasJSReact.CanvasJS
    const CanvasJSChart = CanvasJSReact.CanvasJSChart

    CanvasJS.addColorSet("customColorSet1",
        [colours.red, colours.orange, colours.green, "#d1cfc8"]);

    const options = {
        animationEnabled: true,
        height: 300,
        backgroundColor: null,
        colorSet: "customColorSet1",
        data: [{
            type: "doughnut",
            showInLegend: true,
            startAngle: -90,
            radius: "100%",
            innerRadius: "80%",
            indexLabel: null,
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: "Poor", y: props.poor_percent },
                { name: "Fair", y: props.fair_percent },
                { name: "Mint", y: props.mint_percent },
                { name: "Missing", y: 100 - props.total_percent },
            ]
        }]
    }

    return (

        <div className={classes.chart_wrapper}>

            <div style={{color:colours.dark_blue}} className={classes.title}>CONDITIONS BREAKDOWN</div>

            <CanvasJSChart options={options} />

            <div className={classes.percent} style={{ color: colours.dark_blue }}>{`${Math.round((props.total_percent + Number.EPSILON) * 100) / 100}%`}</div>

            <div className={classes.left_patch}></div>
            <div className={classes.right_patch}></div>
            <div className={classes.key_patch}></div>

            <div className={classes.card_container}>

                <ConditionCard title="Poor" colour={colours.red} number={props.book_data.poor} />
                <ConditionCard title="Fair" colour={colours.orange} number={props.book_data.fair} />
                <ConditionCard title="Mint" colour={colours.green} number={props.book_data.mint} />

            </div>

        </div>


    )

}

export default Donut
