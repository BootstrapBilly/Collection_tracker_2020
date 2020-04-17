export const handle_user_feedback = (alert, feedback, type) => {

    switch (type) {

        case "Add":

            if (feedback.success) return alert.show(feedback.details.year + " Added", { type: "success" })
            if (feedback.error === "In_use") return alert.show(feedback.details.year + " In use", { type: "error" })
            break;


        case "Search":

            if (feedback.success) return alert.show(feedback.details.message, { type: "success" })
            if (feedback.error === "Not_found") return alert.show(feedback.details.year + " Not found", { type: "error" })
            break;

        case "Worth":

            if (feedback.success) return alert.show(feedback.details.message, { type: "success" })
            break;

        default:

        if(feedback.error === "Db_error") return alert.show("Database error", { type: "success" })
    }

}