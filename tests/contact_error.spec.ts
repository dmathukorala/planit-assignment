import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";

test("Verify contact form validation and error handling", async ({ page }) => {

    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    // Step 1: From the home page go to contact page
    await test.step('From the home page go to contact page', async () => {
        await homePage.navigate("http://jupiter.cloud.planittesting.com");
        await homePage.goToContactPage();
    });

    // Step 2: Click submit button without filling anything
    await test.step('Click submit button without filling anything', async () => {
        await contactPage.submitForm();
    });

    // Step 3: Verify error messages
    await test.step('Verify the error messages', async () => {
        await contactPage.verifyHeadingErrorMessage("We welcome your feedback");
        await contactPage.verifyHeadingErrorMessage("- but we won't get it unless you complete the form correctly.");
        await contactPage.verifyForNameError("Forename is required");
        await contactPage.verifyEmailError("Email is required");
        await contactPage.verifyMessageError("Message is required");
    });

    // Step 4: Populate mandatory fields
    await test.step('Populate the mandatory fields', async () => {
        await contactPage.populateMandatoryFields("John Doe", "john@example.com", "This is a test message");
    });

    // Step 5: Validate errors are gone
    await test.step('Validate that the errors are gone', async () => {
        await contactPage.validateHeadingErrorsGone("but we won't get it unless you complete the form correctly.");
        await contactPage.validateFieldErrorsGone();
    });

});
