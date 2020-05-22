describe("@@@@@@@@@@ Grid testing @@@@@@@@@@", () => {

    it("Navigate to the grid", () => {

        cy.get("[test_handle='grid_icon']").click()

    })

    context("Search bar", () => {

        it("Only takes numbers", () => {

            cy.get("[test_handle='search_bar']").type("@").type("n").type("-")
            cy.get("[test_handle='search_bar']").should("have.value", "")

        })

        it("Searchstring - 2 = 25 results", () => {

            cy.get("[test_handle='search_bar']").type("2")
            cy.get("[test_handle='search_bar_input']").should("have.value", "2")

            cy.get("[test_handle='grid_cell']").its("length").should("be.eq", 25)

        })

        it("Searchstring - 20 = 21 results", () => {

            cy.get("[test_handle='search_bar']").type("0")
            cy.get("[test_handle='search_bar_input']").should("have.value", "20")

            cy.get("[test_handle='grid_cell']").its("length").should("be.eq", 21)

        })

        it("Searchstring - 201 = 10 results", () => {

            cy.get("[test_handle='search_bar']").type("1")
            cy.get("[test_handle='search_bar_input']").should("have.value", "201")

            cy.get("[test_handle='grid_cell']").its("length").should("be.eq", 10)

        })

        it("Searchstring - 2012 = 1 result", () => {

            cy.get("[test_handle='search_bar']").type("2")
            cy.get("[test_handle='search_bar_input']").should("have.value", "2012")

            cy.get("[test_handle='grid_cell']").its("length").should("be.eq", 1)

        })

        it("Clear search - 66 results", () => {

            cy.get("[test_handle='search_bar']").type("{backspace}").type("{backspace}").type("{backspace}").type("{backspace}")
            cy.get("[test_handle='search_bar_input']").should("have.value", "")
            cy.get("[test_handle='grid_cell']").its("length").should("be.eq", 66)

        })

    })

    context("Clicking cell functionality", () => {

        it("Clicking an empty book leads to the add book page (prepopulated)", () => {

            cy.get("[test_handle='grid_cell']").eq(1).click()
            cy.get("[test_handle='form_input']").should("have.value", "1956")

        })

        it("Navigate back to the grid", () => {

            cy.get("[test_handle='grid_icon']").click()
            cy.get("[test_handle='search_bar']").should("be.visible")
    
        })

        it("Clicking an existing book displays it", () => {

            cy.get("[test_handle='grid_cell']").eq(0).click()
            cy.get("[test_handle='book_display_container']").should("exist")

        })

        it("Navigate back to the grid", () => {

            cy.get("[test_handle='go_back_button']").click()
            cy.get("[test_handle='search_bar']").should("be.visible")

        })

    })

})
