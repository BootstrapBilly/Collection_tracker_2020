const generate_cells = () => {

    let count = 1955;//start at 1955

    const all_years = []//books to be returned

    while (count <= 2020) {

        all_years.push(count)//add each year between 1955 and 2020 to the array of books to be returned and displayed by grid
        count++

    }

    return all_years //return all possible books
}

export default generate_cells