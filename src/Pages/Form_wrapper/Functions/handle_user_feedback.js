export const handle_user_feedback = (feedback, type) => {

    if(feedback.info) return [feedback.details, "info"]

    switch (type) {

        case "Add":

            if (feedback.success) return [`${feedback.details.book.year} was added in ${feedback.details.book.condition} condition`, "success"]
            if (feedback.error === "In_use") return [`You already have ${feedback.details.year} in ${feedback.details.condition} condition`, "error"]

            break;


        case "Search":

            if (feedback.success) return [[feedback.details.book.year, feedback.details.book.condition], "hidden", "search_success"]
            if (feedback.error === "Not_found") return [`${feedback.details} was not found in your collection.`, "error"]

            break;

        case "Worth":

            if (feedback.success) return "zuc 3"
            break;

        default:

        if(feedback.error === "Db_error") return "zu10"

        else return [null, "hidden"]
    }

}