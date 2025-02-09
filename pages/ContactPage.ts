import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";

export class ContactPage extends BasePage {
    private submitButton = "submit";
    private forenameField = "#forename";
    private emailField = "#email";
    private messageField = "#message";
    private foreNameErr = "#forename-err";
    private emailErr = "#email-err";
    private messageErr = "#message-err";
    private successMessage = ".alert.alert-success";

    constructor(page: Page) {
        super(page);
    }

    async submitForm() {
        const submitButton = this.page.getByText(this.submitButton);
        await submitButton.click();
    }

    async populateMandatoryFields(forename: string, email: string, message: string) {
        await this.page.locator(this.forenameField).fill(forename);
        await this.page.locator(this.emailField).fill(email);
        await this.page.locator(this.messageField).fill(message);
    }

    async verifyHeadingErrorMessage(errorMessage: string) {
        await expect(this.page.getByText(errorMessage)).toBeVisible();
    }

    async verifyForNameError(errorMessage: string) {
        await expect(this.page.locator(this.foreNameErr)).toHaveText(errorMessage);
    }

    async verifyEmailError(errorMessage: string) {
        await expect(this.page.locator(this.emailErr)).toHaveText(errorMessage);
    }

    async verifyMessageError(errorMessage: string) {
        await expect(this.page.locator(this.messageErr)).toHaveText(errorMessage);
    }

    async validateHeadingErrorsGone(errorMessage: string) {
        const errorLocator = this.page.getByText(errorMessage);
        await expect(errorLocator).not.toBeVisible();
    }

    async validateFieldErrorsGone() {
        await expect(this.page.locator(this.foreNameErr)).not.toBeVisible();
        await expect(this.page.locator(this.emailErr)).not.toBeVisible();
        await expect(this.page.locator(this.messageErr)).not.toBeVisible();
    }

    async verifySuccessMessage(expectedText: string) {
        await expect(this.page.locator(this.successMessage)).toHaveText(expectedText), { timeout: 30000 };
    }
}