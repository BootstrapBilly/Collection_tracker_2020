const filter_cells = filter_string => {

    let count = 1955;//define the start of the books

    const filtered_years = []//define the array of filtered books to be returned

    while (count <= 2020){//loop through until the count reaches this year

        if(count.toString().includes(filter_string)){//if the book contains the given search string

            filtered_years.push(count)//add it to the array of filtered books

        }

        count ++//increase the count to move onto the next book
    }

    return filtered_years//return the filtered books
}

export default filter_cells