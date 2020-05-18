const filter_cells = filter_string => {

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

export default filter_cells