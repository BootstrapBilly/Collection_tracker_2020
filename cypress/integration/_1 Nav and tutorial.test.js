describe("@@@@@@@@@@ Nav and tutorial testing @@@@@@@@@@", ()=> {

    context("Grid/initial tutorial", ()=> {

        it("Visit the homepage, complete initial tutorial", ()=>{

            cy.visit(`http://localhost:3000`)
    
            cy.wait(3000)
    
            cy.get("[test_handle='initial_tutorial']").should("be.visible")
            cy.get("[test_handle='tutorial_next_button']").click()
            cy.get("[test_handle='search_tutorial']").should("be.visible")
        })
    
        it("Complete the search tutorial", ()=>{
    
            cy.get("[test_handle='search_bar']").should("be.visible")
            cy.get("[test_handle='tutorial_next_button']").click()
            cy.get("[test_handle='add_tutorial']").should("be.visible")
            
        })
    
        it("Complete the add tutorial", ()=>{
        
            cy.get("[test_handle='add_book_icon']").should("be.visible")
            cy.get("[test_handle='tutorial_next_button']").click()
            cy.get("[test_handle='add_tutorial']").should("not.exist")
    
        })

    })

    context("Donut tutorial", ()=> {

        it("Navigate to the conditions page", ()=> {

            cy.get("[test_handle='donut_icon']").click()
            cy.get("[test_handle='donut_tutorial']").should("be.visible")
        })

        it("Complete the donut tutorial", ()=>{
        
            cy.get("[test_handle='tutorial_next_button']").click()
            cy.get("[test_handle='donut_tutorial']").should("not.exist")
    
        })

    })

    context("Add book tutorial", ()=> {

        it("Navigate to the add_book page", ()=> {

            cy.get("[test_handle='add_book_icon']").click()
            cy.get("[test_handle='add_book_tutorial']").should("be.visible")
        })

        it("Complete the add_book tutorial", ()=>{
        
            cy.get("[test_handle='tutorial_next_button']").click()
            cy.get("[test_handle='add_book_tutorial']").should("not.exist")
    
        })

    })


})