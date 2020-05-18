import React, {useState, useEffect} from 'react'

//css 
import classes from "./Grid.module.css"

//components
import Cell from "./Components/Cell/Cell"

export const Grid = props => {

    const generate_cells = () => {

        let count = 1955;

        const all_years = []

        while(count <= 2020){

            all_years.push(count)
            count ++

        }

        return all_years
    }

    const populate_and_sort_books = () => {

        const books = []
    
        props.books && props.books.forEach(book => books.push(book.year))

        return books.sort((a, b) => a < b && -1) //sort the books by condition (poor, fair ,mint)

    }

    const [existing_books, set_existing_books] = useState([])

    useEffect(() => {
        
        if(props.books) set_existing_books(populate_and_sort_books())

    }, [props.books])

   const cells = generate_cells()

    return (

        <div className={classes.container}>

        {cells.map(year => {

           return <Cell key={year} year={year} books={existing_books}/>
             
        })}
            
        </div>

    )

}

export default Grid