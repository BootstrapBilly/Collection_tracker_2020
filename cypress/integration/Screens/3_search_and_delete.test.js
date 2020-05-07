const find_and_delete_book = (year) => {

    cy.get("[test_handle='form_input']").type(year)
    cy.get("[test_handle='form_input']").should("have.value", year)

    cy.get("[test_handle='form_next_button']").click()

    cy.get("[test_handle='book_options_cog']").click()
    cy.get("[test_handle='delete_book']").click()

    cy.get("[id='easy-alert']").should("be.visible")
    cy.get("[test_handle='form_input']").should("be.visible")

}

describe("@@@@@@@@ SEARCH AND DELETE @@@@@@@@@@@@@@@", () => {

    it(`Visit the search page`, () => cy.visit(`http://localhost:3000/search`))

    it("Find and delete 1999 mint condition",()=> find_and_delete_book("1999"))
    it("Find and delete 1999 fair condition",()=> find_and_delete_book("1999"))
    it("Find and delete 1999 poor condition",()=> find_and_delete_book("1999"))

})