import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";

test("Verify successful form submission", async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    // Step 1: Navigate to home page and go to contact page
    await homePage.navigate("http://jupiter.cloud.planittesting.com");
    await homePage.goToContactPage();

    // Step 2: Populate mandatory fields
    await contactPage.populateMandatoryFields("John Doe", "john@example.com", "Test message");

    // Step 3: Click submit button
    await contactPage.submitForm();

    // Step 4: Validate success message
    await contactPage.verifySuccessMessage("Thanks John Doe, we appreciate your feedback.");
});