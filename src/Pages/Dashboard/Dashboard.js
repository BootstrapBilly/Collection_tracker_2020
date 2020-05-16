//core react
import React, { useEffect, useState } from "react"

//css
import classes from "./Dashboard.module.css"

//components
import Navbar from "../../Shared Components/Navigation/Navigation"
import Donut from "./Components/Donut/Donut"
import BarChart from "./Components/Bar_chart/Bar_chart"
import Tutorial from "../../Shared Components/Tutorial/Tutorial"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { fetch_books } from "../../Store/Actions/Fetch_books_action"
import { clear_form_submission_response } from "../../Store/Actions/Submit_form_action"

//assets
import donut from "../../Assets/Icons/donut.svg"
import barchart from "../../Assets/Icons/barchart.svg"
import colours from "../../Util/Colours"

//functions
import populate_chart_data from "../Dashboard/functions/populate_chart_data"
import handle_tutorial_completion from "../../Util/Handle_tutorial_completion"

const Dashboard = props => {

    //?selectors
    const books = useSelector(state => state.fetch.books)//All books returned from the database

    //*states
    const [condition_count, set_condition_count] = useState({ poor: 0, fair: 0, mint: 0 })//holds the best condition for each book retrieved from that database
    const [unique_years, set_unique_years] = useState(null)//holds 1 copy of each year/book (database can have duplicates with different conditions) - Feeds the era spread breakdown graph
    const [current_graph, set_current_graph] = useState("donut")//holds the current graph to be displayed (only on mobile) - Changed by the icons at the bottom
    const [tutorial_completed, set_tutorial_completed] = useState(window.localStorage.getItem("dashboard_tutorial_completed"))
    
    //-Config
    const dispatch = useDispatch()//initialise the redux usedispatch hook

    //!Effects 
    useEffect(() => {books && populate_chart_data(books, set_unique_years, set_condition_count)}, [books] /*if theres at least 1 book, populate the charts*/)
    // eslint-disable-next-line
    useEffect(() => { dispatch(fetch_books()) }, [] /*fetch the books from the database, only once*/)

    return (

        <div className={classes.container}>

            {tutorial_completed && <Navbar path={props.location.pathname} handle_click={() => dispatch(clear_form_submission_response())} /> /* Show the navbar if the tut is completed*/}

            <div className={classes.mobile_chart_container}>

                {//Mobile only (controlled by css) - charts displayed 1 at a time and toggled
                    current_graph === "donut" ?

                        <Donut condition_count={condition_count} />

                        :

                        <BarChart books={unique_years} />
                }

            </div>

            {/* Mobile only, the icon container which controls which chart to display */}
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

            {/* Landscape / non mobile devices only (controlled by css) - all charts displayed*/}
            <div className={classes.landscape_chart_container}>

                <Donut condition_count={condition_count} />
                <BarChart books={unique_years} />

            </div>

            {!tutorial_completed && <Tutorial text="This is your dashboard. Here you will find various charts and statistics." 
            handle_completion={()=> handle_tutorial_completion("dashboard", null, set_tutorial_completed)}/> } 

        </div>

    )

}

export default Dashboard