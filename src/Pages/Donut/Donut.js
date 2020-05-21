//core react
import React, {useState, useEffect} from 'react'

//css
import classes from "./Donut.module.css"

//components
import ConditionCard from "./Components/Condition_card/Condition_card"
import IconBar from "../../Shared Components/Icon_bar/Icon_bar"

//external
import CanvasJSReact from "../../Assets/Charts/canvasjs.react"
import { motion } from "framer-motion"

//util
import colours from "../../Util/Colours"
import { transition, duration } from "../../Util/Page_transitions"

//func
import populate_chart_data from "../Dashboard/functions/populate_chart_data"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { fetch_books } from "../../Store/Actions/Fetch_books_action"

export const Donut = props => {

    //-Config
    const dispatch = useDispatch()
    
    //?selectors
    const books = useSelector(state => state.fetch.books)//All books returned from the database

    const [unique_years, set_unique_years] = useState(null)//holds 1 copy of each year/book (database can have duplicates with different conditions) - Feeds the era spread
    const [condition_count, set_condition_count] = useState({ poor: 0, fair: 0, mint: 0 })//holds the best condition for each book retrieved from that database 

    const num_books = { total: 65, poor: condition_count.poor, fair: condition_count.fair, mint: condition_count.mint }//get the amount of books

    useEffect(() => { books && populate_chart_data(books, set_unique_years, set_condition_count) }, [books] /*if theres at least 1 book, populate the charts*/)
    useEffect(() => { dispatch(fetch_books()) }, [] /*fetch the books from the database, only once*/)

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

        <React.Fragment>

            <motion.div className={classes.chart_wrapper} initial="initial" animate="in" exit="out" variants={transition} transition={duration}>

                <div style={{ color: colours.dark_blue }} className={classes.title}>CONDITIONS BREAKDOWN</div>

                <CanvasJSChart options={options} />

                <div className={classes.percent} style={{ color: colours.dark_blue }}>{`${Math.round((total_percent + Number.EPSILON) * 100) / 100}%`}</div>

                <div className={classes.left_patch}></div>
                <div className={classes.right_patch}></div>
                <div className={classes.key_patch}></div>

                <div className={classes.card_container}>

                    <ConditionCard title="Poor" colour={colours.red} number={condition_count.poor} />
                    <ConditionCard title="Fair" colour={colours.orange} number={condition_count.fair} />
                    <ConditionCard title="Mint" colour={colours.green} number={condition_count.mint} />

                </div>

            </motion.div>

            <IconBar active_icon={props.active} />

        </React.Fragment>


    )

}

export default Donut
