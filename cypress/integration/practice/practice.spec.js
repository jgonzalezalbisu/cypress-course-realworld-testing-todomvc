describe('React TodoMVC practice', () => {

  beforeEach(() => {
    cy.visit("localhost:8888");
  })

  it('adds five todos', () => {
    // Without using the cy.createDefaultTodos() custom command
    // write a test that asserts you can add 5 todos
    // Hint: make sure to assert the length is equal to 5
    cy.get('.new-todo')
      .type(`One{enter}`)
      .type(`Two{enter}`)
      .type(`Three{enter}`)
      .type(`Four{enter}`)
      .type(`Five{enter}`);

    cy.get("ul.todo-list > li").should("have.length", 5);

  })

  it('focuses on the todo input field, when the app is first opened', () => {
    // Write a test that asserts that the input field
    // is focused automatically when the app is first loaded.
    // Hint: you will need to use cy.focused()
    // https://docs.cypress.io/api/commands/focused
    cy.focused().should("have.class", "new-todo");
    cy.focused().should("have.attr", "placeholder", "What needs to be done?");
    cy.get(".new-todo").should("be.focused");
  })

  it('should clear text input field when an item is added', () => {
    // Write a test that ensures that the input field is cleared
    // after adding a todo
    cy.get(".new-todo")
      .type("Testing and clearing{enter}")
      .should("have.value", "");
    cy.get(".new-todo")
      .type("Testing and clearing")
      .should("have.value", "Testing and clearing");

    ;
  })

  it('can mark a todo as "completed"', () => {
    // Write a test that ensures that a todo can be "completed"
    // Hint: You will need to verify the class name of the completed todo
    cy.get(".new-todo")
      .type("Testing and marking as completed{enter}");
    // .type("Testing and marking as completed{enter}");

    cy.get("ul.todo-list input").first().click();

    cy.get("span.todo-count")
      .should("have.text", "0 items left");


    cy.get("ul.todo-list > li").each(($item, i, $listOfMarkedElements) => {

      // expect
      expect($item[i].getAttribute("class")).to.be.equal("completed");


      // if $listOfMarkedElements[]


    });

  })

  it('the "Clear completed" button clears all completed todos', () => {
    // Write a test that ensures that the "Clear completed" removes
    // all completed todos from the app
    // Hint: You will need to verify the class name of the completed todo
    cy.get(".new-todo")
      .type("Testing and marking as completed{enter}")
      .type("Testing and marking as completed{enter}")
      .type("Testing and marking as completed{enter}");

    cy.get("ul.todo-list input.toggle").each(($element, i, $listOfElements) => {

      // console.log(i);
      // let a = ;
      cy.wrap($listOfElements[i]).click();

    }).then(() => {
      cy.get("button.clear-completed")
        .should("be.visible")
        .and("be.enabled")
        .click();
    });

    cy.get("ul.todo-list li").should("have.length", 0);

  })

  it('allows you to edit a todo', () => {
    // Write a test that ensures that you can edit a todo
    // Hint: You will need to use cy.dblclick()
    // https://docs.cypress.io/api/commands/dblclick
    const text = "Testing and marking as completed";

    cy.get(".new-todo")
      .type(`${text}{enter}`);

    let a;
    cy.get("ul.todo-list > li > div > label").then(($element) => {
      a = $element.text();
      cy.wrap(a).as("toCompare");
      // cy.log(a);
    }).then(() => {

      cy.get("ul.todo-list")
        .find("label")
        .dblclick();

      cy.get("ul.todo-list")
        .find("li.editing")
        .clear()
        .type(`EDITED Item{enter}`);

      cy.get("@toCompare").then(($value) => {
        cy.get("ul.todo-list").find("label").then(($finalValue) => {

          expect($finalValue.text).to.not.be.equal($value);


        });

      });
    });


  })

  it.only('should save edits on blur', () => {
    // Write a test that ensures that an edited todo is saved when it is blurred
    // Hint: You will need to use cy.blur()
    // https://docs.cypress.io/api/commands/blur

    const text = "Testing and marking as completed";

    cy.get(".new-todo")
      .type(`${text}{enter}`);

    let a;
    cy.get("ul.todo-list > li > div > label").then(($element) => {
      a = $element.text();
      cy.wrap(a).as("toCompare");
      // cy.log(a);
    }).then(() => {

      cy.get("ul.todo-list")
        .find("label")
        .dblclick();

      cy.get("ul.todo-list")
        .find("li.editing")
        .focus()
        // .clear()
        .blur()
        // .type(`EDITED Item`).blur();

      cy.get("@toCompare").then(($value) => {
        cy.get("ul.todo-list").find("label").then(($finalValue) => {

          expect($finalValue.text).to.not.be.equal($value);


        });

      });
    });
  })

  it('should display the current number of todo items', () => {
    // Write a test that ensures that the app counts the correct number of todos
    // left to be completed, i.e "3 items left" in the bottom left corner.
  })

  it('should persist its data after a page refresh', () => {
    // Write a test that ensures that the todos are persisted in the app
    // after the browser refreshes the page
    // Hint: You will need to use cy.reload()
    // https://docs.cypress.io/api/commands/reload
  })

  it('can display only completed todos', () => {
    // Write a test that ensures that only the completed todos are
    // displayed when the "Completed" button is clicked at the bottom
  })
})
