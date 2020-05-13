import {enter_year} from "./Form_steps"

describe("@@@@@@@@@@@@ CONDITION FILTER CHECK @@@@@@@@@@@@@@@@@@", () => {

    describe("Mint condition taken", () => {

        it(`Enter 1999 again`, () => enter_year("1999"))

        it(`Only poor and fair are visible because mint is taken`, () => {

            cy.get("[test_handle='Fair']").should("be.visible")
            cy.get("[test_handle='Poor']").should("be.visible")
            cy.get("[test_handle='Mint']").should("not.exist")

        })

        it(`Selecting toggle effect and submitting the form works`, () => {

            cy.get("[test_handle='condition_circle']").eq(0).click()
            cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "flex")

            cy.get("[test_handle='condition_circle']").eq(1).click()
            cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "none")
            cy.get("[test_handle='condition_animation_circle']").eq(1).should("have.css", "display", "flex")
            cy.get("[test_handle='form_next_button']").click()
            cy.get("[test_handle='form_next_button']").click()

        })

    })

    describe("Mint and Fair condition taken", () => {

        it("Click Add more button", ()=> cy.get("[test_handle='go_back_button']").click())

        it(`Enter 1999 again`, () => enter_year("1999"))

        it(`Only poor is visible because mint and fair are taken`, () => {

            cy.get("[test_handle='Poor']").should("be.visible")
            cy.get("[test_handle='Fair']").should("not.exist")
            cy.get("[test_handle='Mint']").should("not.exist")

        })

        it("Select and Submit", () => {

            cy.get("[test_handle='condition_circle']").eq(0).click()
            cy.get("[test_handle='condition_animation_circle']").eq(0).should("have.css", "display", "flex")

            cy.get("[test_handle='form_next_button']").click()
            cy.get("[test_handle='form_next_button']").click()

        })

    })

    describe("All conditions are taken", () => {

        it("Click Add more button", ()=> cy.get("[test_handle='go_back_button']").click())

        it(`Enter 1999 again`, () => enter_year("1999"))

        it(`Alert should pop up saying all conditions are taken`, () => {

            cy.get("[id='easy-alert']").should("be.visible")

        })


    })

})