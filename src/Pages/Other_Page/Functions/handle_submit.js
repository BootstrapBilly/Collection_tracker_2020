export const handle_submit = (selected_condition, given_year, alert, dispatch, action_creator, search_mode, url) => {

    //check the given year is 4 chars long
    if (given_year.length !== 4) return alert.show('Please enter a year between 1950-2020', { type: "error" })

    //if the form is a search form, not add or worth it, then submit only the year
    if (search_mode) return dispatch(action_creator(given_year, url))

    //if no condition is selected, show an alert
    if (!selected_condition) return alert.show('Please select a condition', { type: "error" })

    //If all checks pass, dispatch the form submit action
    else dispatch(action_creator({ year: given_year, condition: selected_condition}, url ))

}
