const find_and_delete_book = (year) => {

    cy.get("[test_handle='search_bar']").type(year)

    cy.get("[test_handle='grid_cell']").click()

    cy.get("[test_handle='book_options_cog_Mint']").click({force:true})
    cy.get("[test_handle='delete_book_Mint']").click({force:true})

    cy.get("[id='easy-alert']").should("be.visible")

}

describe("@@@@@@@@ SEARCH AND DELETE @@@@@@@@@@@@@@@", () => {

    it("Navigate to the grid page", ()=> {

        cy.get("[test_handle='grid_icon']").click()

    })


    it("Find and delete 1999 mint condition",()=> find_and_delete_book("1999"))

    it("Delete 1999 fair condition",()=> {
        
        cy.get("[test_handle='book_options_cog_Fair']").eq(0).click({force:true})
        cy.get("[test_handle='delete_book_Fair']").eq(0).click({force:true})
    })
    it("Delete 1999 poor condition",()=> {
        cy.get("[test_handle='book_options_cog_Poor']").eq(0).click({force:true})
        cy.get("[test_handle='delete_book_Poor']").eq(0).click({force:true})
    })

})