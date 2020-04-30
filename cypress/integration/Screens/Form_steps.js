export const step_one_year = (end_url, only) => {

    describe("First step - Enter year", () => {

        it(`Visit the ${end_url} screen`, () => cy.visit(`http://localhost:3000/${end_url}`))

        context("Buttons hidden to start", () => {

            it("Back button is not visible initially", () => {
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")
            })

            it("Next button is not visible initially", () => {
                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
            })

        })

        context("Year input", () => {

            it("1 number - buttons still hidden", () => {

                cy.get("[test_handle='form_input']").type("1")
                cy.get("[test_handle='form_input']").should("have.value", "1")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

            })

            it("2 numbers - buttons still hidden", () => {

                cy.get("[test_handle='form_input']").type("9")
                cy.get("[test_handle='form_input']").should("have.value", "19")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

            })

            it("3 numbers - buttons still hidden", () => {

                cy.get("[test_handle='form_input']").type("9")
                cy.get("[test_handle='form_input']").should("have.value", "199")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

            })

            it("4 numbers - buttons visible", () => {

                cy.get("[test_handle='form_input']").type("9")
                cy.get("[test_handle='form_input']").should("have.value", "1999")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "block")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

            })

            it("Backspace -  3 numbers, buttons not visible", () => {

                cy.get("[test_handle='form_input']").type("{backspace}")
                cy.get("[test_handle='form_input']").should("have.value", "199")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")


            })


            it("4 numbers - buttons visible", () => {

                cy.get("[test_handle='form_input']").type("9")
                cy.get("[test_handle='form_input']").should("have.value", "1999")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "block")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

            })

        })

        if (only) return

        else context("Moving to step 2", () => {

            it("Next button leads to step 2", () => {

                cy.get("[test_handle='form_next_button']").click()
                cy.get("[test_handle='condition_select']").should("exist")
            })

        })

    })

}

//* Step 2
export const step_two_condition = (only) => {

    describe("Second step - Select condition", () => {

        context("Condition buttons", () => {

            it("None selected initially", () => {

                cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "none")
                cy.get("[test_handle='condition_animation_circle']").eq(1).should("have.css", "display", "none")
                cy.get("[test_handle='condition_animation_circle']").eq(2).should("have.css", "display", "none")

            })

            it("Poor is selectable", () => {

                cy.get("[test_handle='condition_circle']").eq(0).click()
                cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "flex")

            })

            it("Fair is selectable and de-selects poor", () => {

                cy.get("[test_handle='condition_circle']").eq(1).click()
                cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "none")
                cy.get("[test_handle='condition_animation_circle']").eq(1).should("have.css", "display", "flex")

            })

            it("Mint is selectable and de-selects fair", () => {

                cy.get("[test_handle='condition_circle']").eq(2).click()
                cy.get("[test_handle='condition_animation_circle']").eq(1).should("have.css", "display", "none")
                cy.get("[test_handle='condition_animation_circle']").eq(2).should("have.css", "display", "flex")

            })

        })

        context("Moving back to step 1", () => {

            it("Sends user back to step 1/year input", () => {

                cy.get("[test_handle='form_back_button']").click()
                cy.get("[test_handle='form_input']").should("exist")
            })

        })

        context("Moving to step 2", () => {

            it("Next button leads to step 2 and the condition is still selected", () => {

                cy.get("[test_handle='form_next_button']").click()
                cy.get("[test_handle='condition_animation_circle']").eq(2).should("have.css", "display", "flex")
            })

        })

        if (only) return

        else context("Moving to step 3", () => {

            it("Next button leads to step 3", () => {

                cy.get("[test_handle='form_next_button']").click()
                cy.get("[test_handle='form_image_upload']").should("exist")

            })

        })

    })

}