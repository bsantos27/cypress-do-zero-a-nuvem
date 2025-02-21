describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preencher os dados do formulário obrigatórios", () => {
    cy.clock();

    const longText = Cypress._.repeat("preenchendo a mensagem de sucesso", 10);
    cy.get("#firstName").type("Bruno");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("X7n9O@example.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("exibe mensagem de erro com email invalida", () => {
    cy.clock();

    const longText = Cypress._.repeat("preenchendo a mensagem de sucesso", 10);
    cy.get("#firstName").type("Bruno");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("X7n9Oexample.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("Validar numero de telefone com caracteres errados", () => {
    cy.get("#phone").type("asbs").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock();

    cy.get("#firstName").type("Bruno");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("X7n9Oexample.com");
    cy.get("#open-text-area").type("teste");
    cy.get('input[value="phone"]').click();

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();

    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.clock();

    // const data = {
    //   fistName: "Santos",
    //   lastName: "Ester",
    //   email: "X7n9O@example.com",
    //   openTextArea: "Estamos aqui para ouvir você! Nos conte como podemos melhorar sua experiência.",
    // }

    cy.fillMandatoryFieldsAndSubmit(); // add o date na funcao

    cy.get(".success").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu texto", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("marca o tipo de atendimento 'Feedback'", () => {
    cy.get('input[value="feedback"]').check().should("be.checked");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('input[value="phone"]').check();
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        console.log(input);
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .click({ force: true })
      .should("be.visible")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });

  it("preeche o campo da area de texto usando o comando invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "Estamos aqui para ouvir você! Nos conte como podemos melhorar sua experiência.")
      .should("have.value", "Estamos aqui para ouvir você! Nos conte como podemos melhorar sua experiência.");
  })

  it("faz uma requisição HTTP", () => {
    cy.request('url: "https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html"')
      .as('getRequest')
      .its('status').should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText').should('be.equal', 'OK')
  })
});
