//core react
import React from 'react'

//css
import classes from "./Donut.module.css"

//components
import ConditionCard from "../Bar_chart/Components/Condition_card/Condition_card"

//external
import CanvasJSReact from "../../../../Assets/Charts/canvasjs.react"

//util
import colours from "../../../../Util/Colours"

export const Donut = props => {

    //-Config

    const num_books = { total: 65, poor: props.condition_count.poor, fair: props.condition_count.fair, mint: props.condition_count.mint }//get the amount of books
    const compute_percent = amount => (amount / num_books.total) * 100//work out the percentage weighting of the total collection for each condition

    //compute the percent values for each condition e.g. 20/65 books are in poor condition = 30%
    //65 books total
    const poor_percent = compute_percent(num_books.poor)
    const fair_percent = compute_percent(num_books.fair)
    const mint_percent = compute_percent(num_books.mint)

    const total_percent = (poor_percent + fair_percent + mint_percent)//get the percent of all owned books against total books

    const CanvasJS = CanvasJSReact.CanvasJS
    const CanvasJSChart = CanvasJSReact.CanvasJSChart

    CanvasJS.addColorSet("customColorSet1",//define a custom colour set
        [colours.red, colours.orange, colours.green, "#d1cfc8"]);//with an array of colours

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
                { name: "Poor", y: poor_percent },
                { name: "Fair", y: fair_percent },
                { name: "Mint", y: mint_percent },
                { name: "Missing", y: 100 - total_percent },
            ]
        }]
    }

    return (

        <div className={classes.chart_wrapper}>

            <div style={{color:colours.dark_blue}} className={classes.title}>CONDITIONS BREAKDOWN</div>

            <CanvasJSChart options={options} />

            <div className={classes.percent} style={{ color: colours.dark_blue }}>{`${Math.round((total_percent + Number.EPSILON) * 100) / 100}%`}</div>

            <div className={classes.left_patch}></div>
            <div className={classes.right_patch}></div>
            <div className={classes.key_patch}></div>

            <div className={classes.card_container}>

                <ConditionCard title="Poor" colour={colours.red} number={props.condition_count.poor} />
                <ConditionCard title="Fair" colour={colours.orange} number={props.condition_count.fair} />
                <ConditionCard title="Mint" colour={colours.green} number={props.condition_count.mint} />

            </div>

        </div>


    )

}

export default Donut
