//core react
import React, { useEffect, useState } from "react"

//css
import classes from "./Dashboard.module.css"

//components
import Navbar from "../../Shared Components/Options_bar/Options_bar"
import Donut from "./Components/Donut/Donut"
import BarChart from "./Components/Bar_chart/Bar_chart"
import Tutorial from "../../Shared Components/First_time_prompt/First_time_prompt"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { fetch_books } from "../../Store/Actions/Fetch_books_action"
import { CLEAR_SUBMISSION_RESULT } from "../../Store/Actions/Submit_form_action"

//assets
import donut from "../../Assets/Icons/donut.svg"
import barchart from "../../Assets/Icons/barchart.svg"
import colours from "../../Util/Colours"

//functions
import populate_chart_data from "../Dashboard/functions/populate_chart_data"

const Dashboard = props => {

    //?selectors
    const books = useSelector(state => state.fetch.books)//All books returned from the database
    const tutorial_completed = useSelector(state => state.tutorial.completed)//Is the tutorial completed, gets set into local storage after its completed

    //*states
    const [condition_count, set_condition_count] = useState({ poor: 0, fair: 0, mint: 0 })//holds the best condition for each book retrieved from that database
    const [unique_years, set_unique_years] = useState(null)//holds 1 copy of each year/book (database can have duplicates with different conditions) - Feeds the era spread breakdown graph
    const [current_graph, set_current_graph] = useState("donut")//holds the current graph to be displayed (only on mobile) - Changed by the icons at the bottom

    //-Config
    const dispatch = useDispatch()//initialise the redux usedispatch hook

    let num_books = { total: 65, poor: condition_count.poor, fair: condition_count.fair, mint: condition_count.mint }//set the amount of books

    const compute_percent = amount => (amount / num_books.total) * 100//work out the percentage weighting of the total collection for each condition

    //compute the percent values for each condition e.g. 20/65 books are in poor condition = 30%
    //65 books total
    const poor_percent = compute_percent(num_books.poor)
    const fair_percent = compute_percent(num_books.fair)
    const mint_percent = compute_percent(num_books.mint)

    const total_percent = (poor_percent + fair_percent + mint_percent)//get the percent of all owned books against total books

    //!Effects
    useEffect(() => {

        books && populate_chart_data(books, set_unique_years, set_condition_count) //if theres at least 1 book, populate the charts

    }, [books])

// eslint-disable-next-line
    useEffect(()=>{ dispatch(fetch_books())}, [] /*fetch the books from the database, only once*/)

    return (

        <div className={classes.container}>

            {tutorial_completed && <Navbar path={props.location.pathname} onClick={() => dispatch(CLEAR_SUBMISSION_RESULT())}/> /* Show the navbar if the tut is completed*/}

            <div className={classes.mobile_chart_container}>

                {//Mobile only
                current_graph === "donut" ? 

                    <Donut total_percent={total_percent} poor_percent={poor_percent} fair_percent={fair_percent} mint_percent={mint_percent} condition_count={condition_count} />

                    : 

                    <BarChart books={unique_years} />
                }

            </div>

            <div className={classes.landscape_chart_container}>

                <Donut total_percent={total_percent} poor_percent={poor_percent} fair_percent={fair_percent} mint_percent={mint_percent} condition_count={condition_count} />
                <BarChart books={unique_years} />

            </div>

            <div className={classes.mobile_icon_container}>

                <img src={donut} alt="Donut icon" className={classes.icon} 
                onClick={() => set_current_graph("donut")} 
                style={{ borderColor: current_graph === "donut" && colours.blue }} 
                />

                <img src={barchart} alt="Barchart icon" className={classes.icon} 
                onClick={() => set_current_graph("barchart")} 
                style={{ borderColor: current_graph === "barchart" && colours.blue }} 
                />

            </div>

            {tutorial_completed ? null : <div className={classes.click_prevent_overlay}><Tutorial /></div>}

        </div>

    )

}

export default Dashboard