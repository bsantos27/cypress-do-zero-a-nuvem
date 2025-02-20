
import 'cypress-file-upload';

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    fistName: "Bruno",
    lastName: "Silva",
    email: "X7n9O@example.com",
    openTextArea: "Estamos aqui para ouvir você! Nos conte como podemos melhorar sua experiência.",
}) => {
    cy.get("#firstName").type(data.fistName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#email").type(data.email);
    cy.get("#open-text-area").type(data.openTextArea);
    cy.contains('button', 'Enviar').click();
});