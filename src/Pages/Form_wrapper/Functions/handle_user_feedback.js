export const handle_user_feedback = (feedback, type) => {

    console.log(feedback)

    if(feedback.info) return [feedback.details, "info"]

    switch (type) {

        case "Add":

            if (feedback.success) return [`${feedback.details.book.year} was added in ${feedback.details.book.condition} condition`, "success"]
            if (feedback.error === "In_use") return [`You already have ${feedback.details.year} in ${feedback.details.condition} condition`, "error"]

            break;


        case "Search":

            if (feedback.success) return [`${feedback.details.book.year} was found. Best condition : ${feedback.details.book.condition}`, "success"]
            //alert.show(feedback.details.year + " Found", { type: "success" })
            if (feedback.error === "Not_found") return [`${feedback.details} was not found`, "error"]
            //alert.show(feedback.details.year + " Not found", { type: "error" })
            break;

        case "Worth":

            if (feedback.success) return "zuc 3"
            //alert.show(feedback.details.message, { type: "success" })
            break;

        default:

        if(feedback.error === "Db_error") return "zu10"
        //alert.show("Database error", { type: "success" })
        else return [null, "hidden"]
    }

}