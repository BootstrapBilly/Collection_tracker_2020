import React, { useEffect, useState } from "react"

import classes from "./Dashboard.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import ConditionCard from "./Components/Condition_card/Condition_card"

//util
import colours from "../../Util/Colours"
import compute_dimensions from "./functions/compute_dimensions"

//assets
import CanvasJSReact from "../../Assets/Charts/canvasjs.react"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { fetch_books } from "../../Store/Actions/Fetch_books_action"
import {CLEAR_SUBMISSION_RESULT } from "../../Store/Actions/Submit_form_action"

const Dashboard = props => {

    //*states
    const [book_data, set_book_data] = useState({ poor: 0, fair: 0, mint: 0 })

    //-Config
    const dispatch = useDispatch()

    const CanvasJS = CanvasJSReact.CanvasJS
    const CanvasJSChart = CanvasJSReact.CanvasJSChart

    let num_books = { total: 65, poor: book_data.poor, fair: book_data.fair, mint: book_data.mint }//set the amount of books

    const compute_percent = amount => (amount / num_books.total) * 100//work out the percentage weighting of the total collection for each condition

    const poor_percent = compute_percent(num_books.poor)
    const fair_percent = compute_percent(num_books.fair)
    const mint_percent = compute_percent(num_books.mint)

    const total_percent = (poor_percent + fair_percent + mint_percent)//get the percent of all owned books against total books

    //?selectors
    const books = useSelector(state => state.fetch.books)

    const extract_best_conditions = () => {

        const best_conditions = []

        if(books){

            books.forEach(current_book => {

                const condition_weighting = get_condition_weighting(current_book.condition)

                current_book.condition_weighting = condition_weighting
    
                insert_if_best_condition(best_conditions, current_book)
            })
    
        }

        sort_books_into_conditions(best_conditions)

    }

    const get_condition_weighting = condition => {

        if(condition === "Poor") return 1
        if(condition === "Fair") return 2
        if(condition === "Mint") return 3

    }

    const insert_if_best_condition = (best_conditions, current_book) => {

        const book_present = best_conditions.find(book => book.year === current_book.year)

        if(!book_present) {best_conditions.push(current_book)}


        else if(book_present) {

            if(current_book.condition_weighting > book_present.condition_weighting){

            const current_index = best_conditions.indexOf(book_present)

             best_conditions.splice(current_index, 1, current_book)
            }
        }

    }

    useEffect(()=> {

        if(books)
        extract_best_conditions()

    },[books])

    //_Functions
    const sort_books_into_conditions = books => {

        let poor = 0,  fair = 0,  mint = 0;

        books.forEach(book => book.condition === "Poor" ? poor += 1 : book.condition === "Fair" ? fair += 1 : mint += 1)

        set_book_data({poor:poor, fair:fair, mint:mint})
    }

    //!effects
    useEffect(() => {

        dispatch(fetch_books())

        // eslint-disable-next-line
    }, [])

    CanvasJS.addColorSet("customColorSet1",
    [colours.red, colours.orange, colours.green, "#d1cfc8"]);

    const options = {
        animationEnabled: true,
        height: 300,
        backgroundColor:null,
        dataPointMaxWidth:20,
        colorSet: "customColorSet1",
        subtitles: [{
            text: `${Math.round((total_percent + Number.EPSILON) * 100) / 100}%`,
            verticalAlign: "center",
            fontSize: 45,
            dockInsidePlotArea: true,
            fontStyle: "normal", 
            fontColor: colours.dark_blue,
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            startAngle:  -90,
            radius:  "100%", 
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

        <div className={classes.container}>

            <OptionsBar path={props.location.pathname} onClick={()=> dispatch(CLEAR_SUBMISSION_RESULT())} />

            <div className={classes.chart_wrapper}>
            <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
            <div className={classes.left_patch}></div>
            <div className={classes.right_patch}></div>
            <div className={classes.key_patch}></div>
            </div>


            <div className={classes.card_container}>

                <ConditionCard title="Poor" colour={colours.red} number={book_data.poor} />
                <ConditionCard title="Fair" colour={colours.orange} number={book_data.fair} />
                <ConditionCard title="Mint" colour={colours.green} number={book_data.mint} />

            </div>

        </div>

    )

}

export default Dashboard