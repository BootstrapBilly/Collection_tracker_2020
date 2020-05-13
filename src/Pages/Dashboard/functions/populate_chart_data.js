/* Param 1 = All books returned from the database (including duplicates) 
   Param 2 = The setstate hook to populate the state with unique years 
   Param 3 = The setstate hook to set the condition count, to feed the donut chart */

const extract_best_conditions = (books, set_unique_years, set_condition_count) => {

    const best_conditions = []//define the array to hold the best conditions

    if (books) {//If books are present

        books.forEach(current_book => {//loop through them

            const condition_weighting = get_condition_weighting(current_book.condition)//getting the value of their condition (See line 27 for condition weighting values)

            current_book.condition_weighting = condition_weighting //Add the condition weighting value to each book object

            insert_if_better_condition(best_conditions, current_book)//Run the function to insert the current book, if its the better than the one stored in the best_conditions array (see line 38 for details)
            
        })

    }

    set_unique_years(best_conditions)//set the unique years state, to feed the era spread breakdown graph
    populate_condition_count(best_conditions, set_condition_count)//set the condition count state, to feed the donut chart 

}

const get_condition_weighting = condition => {

    if (condition === "Poor") return 1
    if (condition === "Fair") return 2
    if (condition === "Mint") return 3

}

/* Param 1 = Array of best conditions of each book - E.g. if 1990 in poor and mint exists, best conditions will have 1990 in mint and NOT poor 
   Param 2 = The current iteration of the for-each loop called on all books returned from the database (line 10) */

const insert_if_better_condition = (best_conditions, current_book) => {

    const existing_book = best_conditions.find(book => book.year === current_book.year)//check if the best conditions array contains the current book/iteration (line10)

    if (!existing_book) { best_conditions.push(current_book) } //if the book is not inside (no duplicates), insert it regardless of the condition

    else if (existing_book) { //otherwise, if it's present

        if (current_book.condition_weighting > existing_book.condition_weighting) {//if the current book is in better condition than the one already in the array 

            const current_index = best_conditions.indexOf(existing_book)//find the index of the existing book (with worse condition than the current book)

            best_conditions.splice(current_index, 1, current_book)//replace the existing book with the current one, (with better condition)
        }

    }

}
//Param 1 = array of books to sort
//Param 2 = setstate hook to set the condition count, to feed the donut chart

const populate_condition_count = (books, set_condition_count) => {

    let poor = 0, fair = 0, mint = 0;

    books.forEach(book => book.condition === "Poor" ? poor += 1 : book.condition === "Fair" ? fair += 1 : mint += 1)

    set_condition_count({ poor: poor, fair: fair, mint: mint })

}

export default extract_best_conditions