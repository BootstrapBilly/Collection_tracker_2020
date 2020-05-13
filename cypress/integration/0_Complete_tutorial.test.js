describe("@@@@@@@@@@@@@@ Complete the tutorial @@@@@@@@@@@@@@@@@@", () => { 

    context("Stage 1", ()=> {

        it(`Visit the home page`, () => cy.visit(`http://localhost:3000`))

        it("Open the hamburger menu after 10 seconds, then navigate to dashboard", ()=> {
            cy.wait(10000)
 
            cy.get("[test_handle='nav_menu_icon']").click()
            cy.get("[test_handle='nav_home_icon']").click()
                
        })

    })

    context("Stage 2", ()=> {

        it("Open the hamburger menu after 3.5 seconds, then navigate to add book", ()=> {

            cy.wait(3500)
    
            cy.get("[test_handle='tutorial_next_button']").click()
            cy.get("[test_handle='nav_menu_icon']").click()
            cy.get("[test_handle='nav_add_book_icon']").click()
                
        })
    
    })

    context("Stage 3", ()=> {

        it("Open the hamburger menu after 3.5 seconds, then navigate to search", ()=> {

            cy.wait(3500)
    
            cy.get("[test_handle='tutorial_next_button']").click()
            cy.get("[test_handle='nav_menu_icon']").click()
            cy.get("[test_handle='nav_search_icon']").click()
                
        })
    
    })

    context("Finish", ()=> {

        it("Click the finish button after 3.5s, then navigate to add book", ()=> {

            cy.wait(3500)
    
            cy.get("[test_handle='tutorial_next_button']").click()
            cy.get("[test_handle='nav_menu_icon']").click()
            cy.get("[test_handle='nav_add_book_icon']").click()
                
        })
    
    })

})

