import React, { useState, useEffect } from 'react'

//css 
import classes from "./Grid.module.css"

//components
import Cell from "./Components/Cell/Cell"
import SearchBar from "./Components/Search_bar/Search_bar"

//functions
import generate_cells from "./Functions/generate_cells"
import populate_and_sort_books from "./Functions/populate_and_sort_books"
import filter_cells from "./Functions/filter_cells"

export const Grid = props => {

    const [cells, set_cells] = useState([])//holds the years of all books to be mapped into cells (set by generate cells)
    const [filter_string, set_filter_string] = useState(null)//Holds the value of the search box to filter books by the string
    const [existing_books, set_existing_books] = useState([])//holds all books which are present in the collection so they are not greyed out

    useEffect(() => {props.books && set_existing_books(populate_and_sort_books(props.books))}, [props.books])//Feed exisiting books with the data passed in by grid

    useEffect(()=> {filter_string && set_cells(filter_cells(filter_string))}, [filter_string])//If a filter string has been detected, filter the cells to show the search result

    useEffect(()=> {set_cells(generate_cells())},[])//Set the available cells, on page load, only once

    return (

        <div className={classes.container}>

            <SearchBar handle_filter={e => set_filter_string(e.target.value)} value={filter_string}/>

            {cells.map(year => {

                return <Cell key={year} year={year} books={existing_books} />

            })}

        </div>

    )

}

export default Grid