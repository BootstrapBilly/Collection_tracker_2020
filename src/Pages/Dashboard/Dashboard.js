//core react
import React, { useEffect, useState } from "react"

//css
import classes from "./Dashboard.module.css"


//external
import { motion } from "framer-motion"

//components
import Donut from "./Components/Donut/Donut"
import Grid from "./Components/Grid/Grid"


//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { fetch_books } from "../../Store/Actions/Fetch_books_action"

//functions
import populate_chart_data from "../Dashboard/functions/populate_chart_data"

//util
import {transition, duration} from "../../Util/Page_transitions"

const Dashboard = props => {

    //?selectors
    const books = useSelector(state => state.fetch.books)//All books returned from the database

    //*states
    const [condition_count, set_condition_count] = useState({ poor: 0, fair: 0, mint: 0 })//holds the best condition for each book retrieved from that database
    const [unique_years, set_unique_years] = useState(null)//holds 1 copy of each year/book (database can have duplicates with different conditions) - Feeds the era spread breakdown graph
    const [current_graph] = useState(props.active)//holds the current graph to be displayed (only on mobile) - Changed by the icons at the bottom

    //-Config
    const dispatch = useDispatch()//initialise the redux usedispatch hook

    //!Effects 
    useEffect(() => { books && populate_chart_data(books, set_unique_years, set_condition_count) }, [books] /*if theres at least 1 book, populate the charts*/)
    // eslint-disable-next-line
    useEffect(() => { dispatch(fetch_books()) }, [] /*fetch the books from the database, only once*/)

    return (

        <React.Fragment>

            <motion.div className={classes.container} initial="initial" animate="in" exit="out" variants={transition} transition={duration}>

                <div className={classes.mobile_chart_container}>

                    {
                        current_graph === "grid" ?

                            <Grid books={unique_years}/>

                            :

                            <Donut condition_count={condition_count} />

                    }

                </div>

            </motion.div>

        </React.Fragment>


    )

}

export default Dashboard