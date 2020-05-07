import {enter_year} from "./Form_steps"

describe("@@@@@@ CONDITIONS AVAILABLE AGAIN AFTER DELETION @@@@@@@", () => {

        it(`Enter 1999 again`, () => enter_year("1999"))

        it(`All conditions available again after they was deleted`, () => {

            cy.get("[test_handle='Fair']").should("be.visible")
            cy.get("[test_handle='Poor']").should("be.visible")
            cy.get("[test_handle='Mint']").should("be.visible")

        })

})