const find_and_delete_book = (year) => {

    cy.get("[test_handle='form_input']").type(year)
    cy.get("[test_handle='form_input']").should("have.value", year)

    cy.get("[test_handle='form_next_button']").click()

    cy.get("[test_handle='book_options_cog_Mint']").click()
    cy.get("[test_handle='delete_book_Mint']").click()

    cy.get("[id='easy-alert']").should("be.visible")

}

describe("@@@@@@@@ SEARCH AND DELETE @@@@@@@@@@@@@@@", () => {

    it(`Visit the search page`, () => cy.visit(`http://localhost:3000/search`))

    it("Search for a book which is missing, plus button redirects to add book", ()=> {

        cy.get("[test_handle='form_input']").type("1998")
        cy.get("[test_handle='form_input']").should("have.value", "1998")
    
        cy.get("[test_handle='form_next_button']").click()

        cy.get("[test_handle='book_condition']").should("have.text", "Missing")
 
        cy.get("[test_handle='book_options_cog_undefined']").click()
        cy.url().should("include", `/add_book`)

    })

    it(`Visit the search page`, () => cy.visit(`http://localhost:3000/search`))

    it("Find and delete 1999 mint condition",()=> find_and_delete_book("1999"))
    it("Delete 1999 fair condition",()=> {
        cy.get("[test_handle='book_options_cog_Fair']").eq(0).click()
        cy.get("[test_handle='delete_book_Fair']").eq(0).click()
    })
    it("Delete 1999 poor condition",()=> {
        cy.get("[test_handle='book_options_cog_Poor']").eq(0).click()
        cy.get("[test_handle='delete_book_Poor']").eq(0).click()
    })

})