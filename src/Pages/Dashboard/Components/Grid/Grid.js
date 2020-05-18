import React, { useState, useEffect } from 'react'

//css 
import classes from "./Grid.module.css"

//components
import Cell from "./Components/Cell/Cell"
import SearchBar from "./Components/Search_bar/Search_bar"
import Tutorial from "../../../../Shared Components/Tutorial/Tutorial"

//functions
import generate_cells from "./Functions/generate_cells"
import populate_and_sort_books from "./Functions/populate_and_sort_books"
import filter_cells from "./Functions/filter_cells"
import handle_tutorial_completion from "../../../../Util/Handle_tutorial_completion"

//external
import { Redirect } from 'react-router'

//redux hooks
import {useDispatch} from "react-redux"

//redux action creators
import {submit_form} from "../../../../Store/Actions/Submit_form_action"

export const Grid = props => {

    const dispatch = useDispatch()
    
    const [cells, set_cells] = useState([])//holds the years of all books to be mapped into cells (set by generate cells)
    const [filter_string, set_filter_string] = useState(null)//Holds the value of the search box to filter books by the string
    const [existing_books, set_existing_books] = useState([])//holds all books which are present in the collection so they are not greyed out
    const [tutorial_completed, set_tutorial_completed] = useState(window.localStorage.getItem("grid_tutorial_completed"))
    const [redirect, set_redirect] = useState(false)

    useEffect(() => { props.books && set_existing_books(populate_and_sort_books(props.books)) }, [props.books])//Feed exisiting books with the data passed in by grid

    useEffect(() => { filter_string && set_cells(filter_cells(filter_string)) }, [filter_string])//If a filter string has been detected, filter the cells to show the search result

    useEffect(() => { set_cells(generate_cells()) }, [])//Set the available cells, on page load, only once

    const handle_click_book = year => {

        dispatch(submit_form(year, "search_for_book")) 
        set_redirect(year)

    }

    return (

        <div className={classes.container}>

            <SearchBar handle_filter={e => set_filter_string(e.target.value)} value={filter_string} />

            {cells.map(year => {

                return <Cell key={year} year={year} books={existing_books} on_click={year => handle_click_book(year)} />

            })}

            {!tutorial_completed && <Tutorial text="This is your bookshelf. Here you will find an overview of your collection."
                handle_completion={() => handle_tutorial_completion("grid", null, set_tutorial_completed)} />}

            {redirect && <Redirect to={{ pathname: '/search', state: { redirected_from_grid: true, year: props.year } }} />}

        </div>

    )

}

export default Grid