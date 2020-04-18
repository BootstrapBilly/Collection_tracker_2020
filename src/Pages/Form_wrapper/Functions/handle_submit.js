export const handle_submit = (selected_condition, given_year, alert, dispatch, action_creator, handle_validation_failure, search_mode, url) => {

    //check the given year is 4 chars long
    if (given_year.length !== 4) return dispatch(handle_validation_failure('Please enter a year between 1950-2020'))


    //if the form is a search form, not add or worth it, then submit only the year
    if (search_mode) return dispatch(action_creator(given_year, url))

    //if no condition is selected, show an alert
    if (!selected_condition) return dispatch(handle_validation_failure("Please select a condition"))


    //If all checks pass, dispatch the form submit action
    else dispatch(action_creator({ year: given_year, condition: selected_condition}, url ))

}
