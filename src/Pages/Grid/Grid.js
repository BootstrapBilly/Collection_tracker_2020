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
    const all_grid_completed = useSelector(state => state.tutorial.all_grid)

    //-config
    const dispatch = useDispatch()

    //*states
    const [cells, set_cells] = useState([])//holds the years of all books to be mapped into cells (set by generate cells)
    const [filter_string, set_filter_string] = useState(null)//Holds the value of the search box to filter books by the string
    const [existing_books, set_existing_books] = useState([])//holds all books which are present in the collection so they are not greyed out
    const [redirect, set_redirect] = useState(null)//used to redirect upon clicking a cell/book

    //!effects

    //If they type something into the search bar
    useEffect(() => {

        filter_string && !filter_string.length//If they type in a searchstring in the search box, then delete it all leaving "" as the searchstring,

            ? set_cells(generate_cells)//display all books

            : set_cells(filter_cells(filter_string))//otherwise if theres a string present, filter the cells and display  only contain that string

    }, [filter_string])

    useEffect(() => {set_cells(generate_cells()) }, [])//Fetch the books insert all available cells (missing and present books), only once, on page load

    useEffect(() => { books && set_existing_books(populate_and_sort_books(books)) }, [books])//Feed exisiting books with the data passed in by grid

    useEffect(() => {dispatch(fetch_books()) }, []) /*fetch the books from the database, only once*/


    //_functions

    //Called when a cell/book in the grid is clicked
    const handle_click_book = details => {

        //if the book is missing, redirect the user to the form, (missing true is picked up by an effect in the form component, and used to prepopulate i twith the given year)
        if (details.missing) {

            return set_redirect({ year: details.year.toString(), missing: true })

        }

        //Otherwise, pull the book data from the API,
        dispatch(submit_form(details, "search_for_book"))

        //Then redirect them to the page, displaying the book in more detail
        set_redirect(details)

    }

    return (

        <React.Fragment>

            <motion.div className={classes.container} initial="initial" animate="in" exit="out" variants={transition} transition={duration}>

                <SearchBar handle_filter={event => isNaN(event.target.value) ? null : set_filter_string(event.target.value)} value={filter_string} />

                {//Cells are populate by the useffect(line 60) and filtered by the useffect(line 50)
                    cells.map(year => {

                        return <Cell key={year} year={year} books={existing_books} on_click={details => handle_click_book(details)} test_handle="grid_cell" />

                    })}

                {//If the user clicks a book, handle_book_click (line 69) will be called, setting the redirect state to true and redirecting the user
                redirect &&
                    //If they click on a missing book, redirect them to the form
                    redirect.missing ? <Redirect to={{ pathname: '/add_book', state: { missing: true, year: redirect.year } }} />

                    : redirect &&
                    //Otherwise, redirect them to the search page (which displays the book in more detail)
                    <Redirect to={{ pathname: '/search', state: { redirected_from_grid: true, year: redirect.year } }} />

                }

            </motion.div>

            {!all_grid_completed && <GridTutorial type="grid" /> /* If the user*/}
                
            {search_completed && <IconBar active_icon={props.active} on_help_click={() => reset_tutorial(["initial", "search", "add", "all_grid"])} />}

        </React.Fragment>
    )

}

export default Grid