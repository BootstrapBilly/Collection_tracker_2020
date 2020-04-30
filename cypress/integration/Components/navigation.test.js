describe("Opening and closing the nav bar", () => {

    it("Visit the home screen", () => cy.visit("http://localhost:3000/"))

        it("Nav is not visibile initially", () => {
            cy.get('[test_handle="nav_overlay"]').should("not.exist")
        })

        it("Clicking menu opens nav bar", () => {
            cy.get('[test_handle="nav_menu_icon"]').click()
            cy.get('[test_handle="nav_overlay"]').should("exist")
        })

        it("Clicking menu (while nav open) closes nav bar", () => {
            cy.get('[test_handle="nav_menu_icon"]').click()
            cy.get('[test_handle="nav_overlay"]').should("not.exist")
        })

        it("Clicking overlay (while nav open) closes nav bar", () => {
            cy.get('[test_handle="nav_menu_icon"]').click()
            cy.get('[test_handle="nav_overlay"]').click()
            cy.get('[test_handle="nav_overlay"]').should("not.exist")
        })

})

describe("Navbar routes correctly", () => {

    it("Add book leads to add book", () => {

        cy.get('[test_handle="nav_menu_icon"]').click()
        cy.get('[test_handle="nav_add_book_icon"]').click()
        cy.url().should("include", `/add_book`)
    
    })

    it("Search leads to search", () => {

        cy.get('[test_handle="nav_menu_icon"]').click()
        cy.get('[test_handle="nav_search_icon"]').click()
        cy.url().should("include", `/search`)
    
    })

    it("Worth leads to worth", () => {

        cy.get('[test_handle="nav_menu_icon"]').click()
        cy.get('[test_handle="nav_worth_icon"]').click()
        cy.url().should("include", `/worth`)
    
    })

    it("Home leads to home", () => {

        cy.get('[test_handle="nav_menu_icon"]').click()
        cy.get('[test_handle="nav_home_icon"]').click()
        cy.url().should("eq", Cypress.config().url + "/")
    
    })




})




