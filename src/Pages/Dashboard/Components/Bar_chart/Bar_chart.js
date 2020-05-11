import React, {useEffect, useState} from 'react'

import classes from "./Bar_chart.module.css"

//external
import CanvasJSReact from "../../../../Assets/Charts/canvasjs.react"

//util
import colours from "../../../../Util/Colours"

export const Bar_chart = props => {

    const column_data = [{start:1955, end: 1967}, {start:1968, end: 1980}, {start:1981, end: 1993}, {start:1994, end: 2006},{start:2007, end: 2019}]

    const [books_in_each, set_books_in_each] = useState([0,0,0,0,0])

    const sort_into_blocks = () => {

        const state_copy = [0,0,0,0,0]

        props.books.forEach(book => {

            let column_count = 0;
            
            column_data.forEach(column => {

                if(book.year >= column.start && book.year <= column.end){

                state_copy[column_count] ++
 
                 column_count = 0
                 console.log(book.year)

                 console.log(state_copy)

                }

               else column_count ++

            })
        })

        set_books_in_each(state_copy)

    }


    //-Config
    const CanvasJS = CanvasJSReact.CanvasJS
    const CanvasJSChart = CanvasJSReact.CanvasJSChart

    const options = {
        animationEnabled: true,
        height: 300,
        width:370,
        backgroundColor: null,
        title: {
            text: "Era Spread Breakdown",
            fontColor:colours.dark_blue,
            margin:25
		},
        axisY:{
            maximum:100,
            suffix:"%"
            },
            axisX:{
                labelFontSize:12,
            },
        data: [{				
                  type: "column",
                  dataPoints: [
                      { label: "1955-1967",  y:  books_in_each[0]/13 * 100 },
                      { label: "1968-1980", y: books_in_each[1]/13 * 100  },
                      { label: "1981-1993", y:  books_in_each[2]/13 * 100   },
                      { label: "1994-2006",  y:  books_in_each[3]/13 * 100   },
                      { label: "2007-2019",  y: books_in_each[4]/13 * 100  }
                  ]
         }]
     }

     useEffect(()=>{if(props.books) sort_into_blocks()},[props.books])

    return (

        <div className={classes.chart_wrapper}>

            <CanvasJSChart options={options} />
            
            <div className={classes.left_patch}></div>
            <div className={classes.right_patch}></div>

        </div>

    )

    

}

export default Bar_chart
