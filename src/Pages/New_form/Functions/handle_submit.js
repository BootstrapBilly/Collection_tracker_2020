export const handle_submit = (selected_condition, input, alert, dispatch, action_creator, search_mode) => {

    if (input.length !== 4) return alert.show('Please enter a year between 1950-2020', { type: "error" })

    if (search_mode) return dispatch(action_creator(input))

    if (!selected_condition) return alert.show('Please select a condition', { type: "error" })

    else dispatch(action_creator({ year: input, condition: selected_condition }))

}

// const handle_search_for_book = () => {

//     if (input.length !== 4) return alert.show('Please enter a year between 1950-2020', { type: "error" })

//     else dispatch(find_book_action(input))

// }