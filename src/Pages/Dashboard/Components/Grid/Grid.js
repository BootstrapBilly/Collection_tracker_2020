import React, { useState, useEffect } from 'react'

//css 
import classes from "./Grid.module.css"

//components
import Cell from "./Components/Cell/Cell"
import SearchBar from "./Components/Search_bar/Search_bar"

export const Grid = props => {

    const [cells, set_cells] = useState([])
    const [existing_books, set_existing_books] = useState([])

    const generate_cells = () => {

        let count = 1955;

        const all_years = []

        while (count <= 2020) {

            all_years.push(count)
            count++

        }

        return all_years
    }

    const populate_and_sort_books = () => {

        const books = []

        props.books && props.books.forEach(book => books.push(book.year))

        return books.sort((a, b) => a < b && -1) //sort the books by condition (poor, fair ,mint)

    }

    const filter_cells = () => {

        let count = 1955;

        const filtered_years = []

        while (count <= 2020){

            if(count.toString().includes(filter_string)){

                filtered_years.push(count)

            }

            count ++
        }

        return filtered_years
    }

    

    useEffect(() => {

        if (props.books) set_existing_books(populate_and_sort_books())

    }, [props.books])



    const [filter_string, set_filter_string] = useState(null)

    console.log(filter_string)

    useEffect(()=> {

        if(filter_string){

            set_cells(filter_cells())

        }

    }, [filter_string])

    useEffect(()=> {

        set_cells(generate_cells())

    },[])

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