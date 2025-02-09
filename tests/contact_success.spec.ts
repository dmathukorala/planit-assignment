import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";

test("Verify successful form submission", async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    // Step 1: Navigate to home page and go to contact page
    await test.step('Navigate to home page and go to contact page', async () => {
        await homePage.navigate("http://jupiter.cloud.planittesting.com");
        await homePage.goToContactPage();
    });

    // Step 2: Populate mandatory fields
    await test.step('Populate the mandatory fields', async () => {
        await contactPage.populateMandatoryFields("John Doe", "john@example.com", "Test message");
    });

    // Step 3: Click submit button
    await test.step('Click the submit button', async () => {
        await contactPage.submitForm();
    });

    // Step 4: Validate success message
    await test.step('Validate the success message', async () => {
        await contactPage.verifySuccessMessage("Thanks John Doe, we appreciate your feedback.");
    });
});