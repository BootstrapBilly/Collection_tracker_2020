const generate_cells = () => {

    let count = 1955;

    const all_years = []

    while (count <= 2020) {

        all_years.push(count)
        count++

    }

    return all_years
}

export default generate_cells