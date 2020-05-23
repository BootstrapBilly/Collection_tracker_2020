const populate_and_sort_books = books => {

    const sorted_books = []//define the array of sorted books to be returned

    books && books.forEach(book => sorted_books.push(book.year))//if theres books, pull out the year and populate the array 

    return sorted_books.sort((a, b) => a < b && -1) //then sort them by year

}

export default populate_and_sort_books