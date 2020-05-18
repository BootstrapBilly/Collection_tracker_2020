//core react
import React, { useEffect, useState } from "react"

//css
import classes from "./Dashboard.module.css"

//components
import Navbar from "../../Shared Components/Navigation/Navigation"
import Donut from "./Components/Donut/Donut"
import BarChart from "./Components/Bar_chart/Bar_chart"
import Grid from "./Components/Grid/Grid"
import IconBar from "./Components/Icon_bar/Icon_bar"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { fetch_books } from "../../Store/Actions/Fetch_books_action"
import { clear_form_submission_response } from "../../Store/Actions/Submit_form_action"

//functions
import populate_chart_data from "../Dashboard/functions/populate_chart_data"


const Dashboard = props => {

    //?selectors
    const books = useSelector(state => state.fetch.books)//All books returned from the database

    //*states
    const [condition_count, set_condition_count] = useState({ poor: 0, fair: 0, mint: 0 })//holds the best condition for each book retrieved from that database
    const [unique_years, set_unique_years] = useState(null)//holds 1 copy of each year/book (database can have duplicates with different conditions) - Feeds the era spread breakdown graph
    const [current_graph, set_current_graph] = useState("grid")//holds the current graph to be displayed (only on mobile) - Changed by the icons at the bottom
    

    //-Config
    const dispatch = useDispatch()//initialise the redux usedispatch hook

    //!Effects 
    useEffect(() => { books && populate_chart_data(books, set_unique_years, set_condition_count) }, [books] /*if theres at least 1 book, populate the charts*/)
    // eslint-disable-next-line
    useEffect(() => { dispatch(fetch_books()) }, [] /*fetch the books from the database, only once*/)

    return (

        <div className={classes.container}>

            <Navbar path={props.location.pathname} handle_click={() => dispatch(clear_form_submission_response())} />

            <div className={classes.mobile_chart_container}>

                {//Mobile only (controlled by css) - charts displayed 1 at a time and toggled
                    current_graph === "grid" ?

                        <Grid books={unique_years} />

                        : current_graph === "donut" ?

                            <Donut condition_count={condition_count} />

                            :

                            <BarChart books={unique_years} />
                }

            </div>

            {/* Mobile only, the icon container which controls which chart to display */}

            <IconBar current_graph={current_graph} handle_select_icon={icon => set_current_graph(icon)} />

            {/* Landscape / non mobile devices only (controlled by css) - all charts displayed*/}
            <div className={classes.landscape_chart_container}>

                <Grid books={unique_years} />
                <Donut condition_count={condition_count} />
                <BarChart books={unique_years} />

            </div>

        </div>

    )

}

export default Dashboard