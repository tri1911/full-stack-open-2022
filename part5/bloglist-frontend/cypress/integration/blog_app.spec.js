describe("Blog app", function () {
  beforeEach(function () {
    // clear the database state before tests
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // create a user
    cy.createUser({
      username: "elliot1911",
      name: "Elliot Ho",
      password: "secret",
    });
    cy.createUser({
      username: "root",
      name: "Super User",
      password: "secret2",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("form#login-form");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username-input").type("elliot1911");
      cy.get("#password-input").type("secret");
      cy.get("#login-button").click();

      cy.contains("Elliot Ho logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username-input").type("elliot1911");
      cy.get("#password-input").type("wrong-password");
      cy.get("#login-button").click();

      cy.get("#notification-div").should(
        "contain",
        "wrong username or password"
      );
      cy.get("#notification-div").should("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "Elliot Ho logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "elliot1911", password: "secret" });
    });

    it("A blog can be created", function () {
      cy.get("#title-input").type("a blog title created by cypress");
      cy.get("#author-input").type("Author Sample");
      cy.get("#url-input").type("example.com");
      cy.get("#create-blog-btn").click();
      cy.contains("a blog title created by cypress");
      cy.contains("Author Sample");
    });

    describe("and some blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the second most likes",
          author: "Author 1",
          url: "example1.com",
        });
        cy.createBlog({
          title: "second blog",
          author: "Author 2",
          url: "example2.com",
        });
        cy.createBlog({
          title: "The title with the most likes",
          author: "Author 3",
          url: "example3.com",
        });
      });

      it("users can like a blog", function () {
        cy.contains("second blog").as("theSecondBlog");
        cy.get("@theSecondBlog").contains("view").click();
        cy.get("@theSecondBlog").contains("like").click();
        cy.contains("likes 1");
      });

      it("the user who created a blog can delete it", function () {
        cy.contains("second blog").as("theSecondBlog");
        cy.get("@theSecondBlog").contains("view").click();
        cy.get("@theSecondBlog").contains("remove").click("");
        cy.get("html").should("not.contain", "second blog");
      });

      it("another user cannot delete the blog", function () {
        cy.contains("logout").click();
        cy.login({ username: "root", password: "secret2" });
        cy.contains("second blog").as("theSecondBlog");
        cy.get("@theSecondBlog").contains("view").click();
        cy.get("@theSecondBlog").should("not.contain", "remove");
      });

      it("check the descending order by number of likes", function () {
        cy.contains("The title with the most likes").as("mostLikes");
        cy.contains("The title with the second most likes").as(
          "secondMostLikes"
        );
        cy.get("@mostLikes").contains("view").click();
        cy.get("@secondMostLikes").contains("view").click();

        cy.get("@mostLikes").contains("like").click();
        cy.wait(500);
        cy.get("@mostLikes").contains("like").click();
        cy.wait(500);

        cy.get("@secondMostLikes").contains("like").click();
        cy.wait(500);

        cy.get(".blog")
          .eq(0)
          .should("contain", "The title with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "The title with the second most likes");
      });
    });
  });
});
