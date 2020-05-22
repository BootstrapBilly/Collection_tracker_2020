import { step_one_year } from "./Form_steps"
import { step_two_condition } from "./Form_steps"
import { dismiss_prompt } from "./Form_steps"

describe("@@@@@@@@@ ADD BOOK @@@@@@@@@@@@", () => {

    it("Navigate to add book", ()=> {

        cy.get("[test_handle='add_book_icon']").click()
    })

    step_one_year("Add_book", "1999")

    step_two_condition()

    describe("Third/final step - Add photo", () => {

        context("Moving back to step 2", () => {

            it("Back button leads to step 2 and the condition is still selected", () => {

                cy.get("[test_handle='form_back_button']").click()
                cy.get("[test_handle='condition_animation_circle']").eq(2).should("have.css", "display", "flex")
            })
        })

        context("Submission", () => {

            it("Submit should render the book", () => {

                cy.get("[test_handle='form_next_button']").click()
                cy.get("[test_handle='form_image_upload']").should("exist")

                cy.get("[test_handle='form_next_button']").click()
                cy.get("[test_handle='book_card']").should("exist")
            })

            it("Click Add more button", () => cy.get("[test_handle='go_back_button']").click())

        })

    })

})
