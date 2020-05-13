//core react
import React, { useEffect, useState } from 'react'

//css
import classes from "./Bar_chart.module.css"

//external
import CanvasJSReact from "../../../../Assets/Charts/canvasjs.react"

//util
import colours from "../../../../Util/Colours"

//functions
import sort_into_columns from "./Functions/Sort_into_columns"

export const Bar_chart = props => {

    //-config
    const divisor = 13//Number of total possible books in each column (total books is {current year} - 1955 
    const column_cutoff = [{ start: 1955, end: 1967 }, { start: 1968, end: 1980 }, { start: 1981, end: 1993 }, { start: 1994, end: 2006 }, { start: 2007, end: 2019 }]//start and end of each column

    //*states
    const [books_in_each_column, set_books_in_each_column] = useState([0, 0, 0, 0, 0])//hold the amount of books in each column of the graph

    //!Effects
    useEffect(() => { if (props.books) sort_into_columns(props.books, column_cutoff, set_books_in_each_column) }, [props.books])//if theres books, sort them into era blocks

    //_Chart options

    const CanvasJS = CanvasJSReact.CanvasJS
    const CanvasJSChart = CanvasJSReact.CanvasJSChart

    CanvasJS.addColorSet("customColorSet2",
    [colours.red, colours.orange, colours.green, colours.dark_blue, "#d1cfc8"]);

    const options = {
        animationEnabled: true,
        height: 355,
        width: 330,
        backgroundColor: null,
        colorSet: "customColorSet2",
        axisY: {
            maximum: 100,
            suffix: "%"
        },
        axisX: {
            labelFontSize: 12,
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "1955-1967", y: books_in_each_column[0] / divisor * 100 },
                { label: "1968-1980", y: books_in_each_column[1] / divisor * 100 },
                { label: "1981-1993", y: books_in_each_column[2] / divisor * 100 },
                { label: "1994-2006", y: books_in_each_column[3] / divisor * 100 },
                { label: "2007-2019", y: books_in_each_column[4] / divisor * 100 }
            ]
        }]
    }

    return (

        <div className={classes.chart_wrapper}>

            <div style={{ color: colours.dark_blue }} className={classes.title}>ERA SPREAD BREAKDOWN</div>

            <CanvasJSChart options={options} />

            <div className={classes.left_patch}></div>
            <div className={classes.right_patch}></div>

        </div>

    )

}

export default Bar_chart
