/* Param 1, books passed in by props to barchar
    Param 2 column cutoff data
    Param 3 setstate hook to update the books in each state */

const sort_into_columns = (books, column_cutoff, set_books_in_each_column) => {

    const books_in_each = [0, 0, 0, 0, 0]//define an array to hold number of books in each column

    books.forEach(book => {//loop through all given books

        let current_index = 0; //define the current index

        try{

            column_cutoff.forEach(column => {//loop through each column, getting the start and finish year of that column

                if (book.year >= column.start && book.year <= column.end) {//if the current book (line 9), fits into the current column
    
                    books_in_each[current_index]++ //Add 1 to the relevant column
    
                    current_index = 0//Then reset the current index for the next book, and start again from (line 15)
                }
    
                else current_index++//if the book does not fit into the column, increase the index and check the next column
    
            })

        }

        catch(error){console.log(error)}

    })

    //once the array has been populated with books in each, set the state of the barchart component, to render the populated barchart
    set_books_in_each_column(books_in_each)

}

export default sort_into_columns