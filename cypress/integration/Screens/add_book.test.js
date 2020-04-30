import {step_one_year} from "./Form_steps"
import {step_two_condition} from "./Form_steps"

step_one_year("Add_book")

step_two_condition()

describe("Third/final step - Add photo", () => {

    context("Moving back to step 2", () => {

        it("Back button leads to step 2 and the condition is still selected", () => {

            cy.get("[test_handle='form_back_button']").click()
            cy.get("[test_handle='condition_animation_circle']").eq(2).should("have.css", "display", "flex")
            cy.get("[test_handle='form_next_button']").click()
        })
    })

})
