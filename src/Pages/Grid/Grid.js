import React, { useState, useEffect } from 'react'

//css 
import classes from "./Grid.module.css"

//components
import Cell from "./Components/Cell/Cell"
import SearchBar from "./Components/Search_bar/Search_bar"
import GridTutorial from "./Components/Grid_tutorial/Grid_tutorial"
import IconBar from "../../Shared Components/Icon_bar/Icon_bar"

//functions
import generate_cells from "./Functions/generate_cells"
import populate_and_sort_books from "./Functions/populate_and_sort_books"
import filter_cells from "./Functions/filter_cells"

//external
import { Redirect } from 'react-router'
import { motion } from "framer-motion"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { submit_form } from "../../Store/Actions/Submit_form_action"
import { fetch_books } from "../../Store/Actions/Fetch_books_action"

//util
import { transition, duration } from "../../Util/Page_transitions"
import reset_tutorial from "../../Util/reset_tutorial"

export const Grid = props => {

    //?selectors
    const books = useSelector(state => state.fetch.books)//All books returned from the database
    const search_completed = useSelector(state => state.tutorial.search)

    const dispatch = useDispatch()

    const all_grid_completed = useSelector(state => state.tutorial.all_grid)

    const [cells, set_cells] = useState([])//holds the years of all books to be mapped into cells (set by generate cells)
    const [filter_string, set_filter_string] = useState(null)//Holds the value of the search box to filter books by the string
    const [existing_books, set_existing_books] = useState([])//holds all books which are present in the collection so they are not greyed out
    const [redirect, set_redirect] = useState(null)
    

    useEffect(() => {
        filter_string &&

            !filter_string.length ? set_cells(generate_cells) :
            set_cells(filter_cells(filter_string))
    }, [filter_string])//If a filter string has been detected, filter the cells to show the search result

    useEffect(() => { set_cells(generate_cells()) }, [])//Set the available cells, on page load, only once


    // useEffect(() => { existing_books && populate_chart_data(existing_books, set_unique_years, set_condition_count) }, [existing_books] /*if theres at least 1 book, populate the charts*/)
    useEffect(() => { books && set_existing_books(populate_and_sort_books(books)) }, [books])//Feed exisiting books with the data passed in by grid

    useEffect(() => { dispatch(fetch_books()) }, [] /*fetch the books from the database, only once*/)




    const handle_click_book = details => {

        if (details.missing) {

            console.log("trigga")
            return set_redirect({ year: details.year.toString(), missing: true })

        }

        dispatch(submit_form(details, "search_for_book"))
        set_redirect(details)

    }

    return (

        <React.Fragment>

            <motion.div className={classes.container} initial="initial" animate="in" exit="out" variants={transition} transition={duration}>

                <SearchBar handle_filter={event => isNaN(event.target.value) ? null : set_filter_string(event.target.value)} value={filter_string} />

                {cells.map(year => {

                    return <Cell key={year} year={year} books={existing_books} on_click={details => handle_click_book(details)} />

                })}

                {redirect &&

                    redirect.missing ? <Redirect to={{ pathname: '/add_book', state: { missing: true, year: redirect.year } }} />

                    : redirect &&

                    <Redirect to={{ pathname: '/search', state: { redirected_from_grid: true, year: redirect.year } }} />

                }

      

            </motion.div>

            {!all_grid_completed && <GridTutorial />}
            {search_completed && <IconBar active_icon={props.active} on_help_click={()=> reset_tutorial(["initial", "search", "add", "all_grid"])} />}

        </React.Fragment>
    )

}

export default Grid