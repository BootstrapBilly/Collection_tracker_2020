const populate_and_sort_books = books => {

    const sorted_books = []

    books && books.forEach(book => sorted_books.push(book.year))

    return sorted_books.sort((a, b) => a < b && -1) 

}

export default populate_and_sort_books