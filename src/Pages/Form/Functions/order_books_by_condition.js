const order_books_by_condition = books => {

    if (!books) return null

    const weighted_books = [];//define an array to hold the weighted books
    const weightings = [["Poor", 1], ["Fair", 2], ["Mint", 3]]//define the value of each condition

    books.forEach(book => { //loop through each given book

        weightings.forEach(weighting => {//and loop through each weighting value

            //if (when) the current books (line 6) condition matches the weighting in the array, (line 4)
            if (book.condition === weighting[0]) weighted_books.push({ book: book, weighting: weighting[1] })//push the book, along with the weighting value into the the weighted books array
        })
    }
    )

    weighted_books.sort((a, b) => a.weighting < b.weighting && -1) //return the books, sorted by condition (poor, fair ,mint)

    const clean_array = []

    weighted_books.forEach(book => clean_array.push(book.book))

    return clean_array

}

export default order_books_by_condition