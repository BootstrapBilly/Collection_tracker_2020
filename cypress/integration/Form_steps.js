export const step_one_year = (end_url, year, only) => {

    describe("First step - Enter year", () => {

        // it(`Visit the ${end_url} screen`, () => cy.visit(`http://localhost:3000/${end_url}`))

        it("Buttons hidden to start", () => {

                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
        
        })

        context("Year input", () => {

            it("Next button becomes visible on length 4 and disappears on length 3", () => {

                cy.get("[test_handle='form_input']").type("1")
                cy.get("[test_handle='form_input']").should("have.value", "1")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

                cy.get("[test_handle='form_input']").type("9")
                cy.get("[test_handle='form_input']").should("have.value", "19")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

                cy.get("[test_handle='form_input']").type("9")
                cy.get("[test_handle='form_input']").should("have.value", "199")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

                cy.get("[test_handle='form_input']").type("9")
                cy.get("[test_handle='form_input']").should("have.value", "1999")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "block")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

                cy.get("[test_handle='form_input']").type("{backspace}")
                cy.get("[test_handle='form_input']").should("have.value", "199")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

            })

        })

        context("Checking alert error handling", () => {

            it("Clear the input then type something out of bounds", () => {

                cy.get("[test_handle='form_input']").type("{backspace}")
                cy.get("[test_handle='form_input']").type("{backspace}")
                cy.get("[test_handle='form_input']").type("{backspace}")
                cy.get("[test_handle='form_input']").type("{backspace}")

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "none")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

                cy.get("[test_handle='form_input']").type("2927")
                cy.get("[test_handle='form_next_button']").click()

                cy.get("[id='easy-alert']").should("be.visible")

            })

        })

         context("Moving to step 2", () => {

            it("Next button leads to step 2", () => {

                cy.get("[test_handle='form_input']").type("{backspace}")
                cy.get("[test_handle='form_input']").type("{backspace}")
                cy.get("[test_handle='form_input']").type("{backspace}")
                cy.get("[test_handle='form_input']").type("{backspace}")

                cy.get("[test_handle='form_input']").type(year)
                cy.get("[test_handle='form_input']").should("have.value", year)

                cy.get("[test_handle='form_next_button']").should("have.css", "display", "block")
                cy.get("[test_handle='form_back_button']").should("have.css", "display", "none")

                cy.get("[test_handle='form_next_button']").click()

                if (only) return

                else cy.get("[test_handle='condition_select']").should("exist")

            })

        })

    })

}

//* Step 2
export const step_two_condition = (only, removed_conditions) => {

    describe("Second step - Select condition", () => {

        context("Condition buttons", () => {

            it("None selected initially", () => {

                cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "none")
                cy.get("[test_handle='condition_animation_circle']").eq(1).should("have.css", "display", "none")
                cy.get("[test_handle='condition_animation_circle']").eq(2).should("have.css", "display", "none")

            })

            it("All buttons selectable and de-select other buttons (radio buttons)", () => {

                cy.get("[test_handle='condition_circle']").eq(0).click()
                cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "flex")

                cy.get("[test_handle='condition_circle']").eq(1).click()
                cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "none")
                cy.get("[test_handle='condition_animation_circle']").eq(1).should("have.css", "display", "flex")

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

export const enter_year = year => {

    // cy.visit(`http://localhost:3000/add_book`)
    cy.get("[test_handle='form_input']").type(year)
    cy.get("[test_handle='form_input']").should("have.value", year)
    cy.get("[test_handle='form_next_button']").click()

}