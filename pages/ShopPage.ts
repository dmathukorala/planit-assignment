import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class ShopPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async addProductToCart(productName: string, quantity: number) {
        const productLocator = this.page.locator(`//div[h4[contains(text(), "${productName}")]]//a[contains(@class, "btn-success")]`);
        for (let i = 0; i < quantity; i++) {
            await productLocator.click();
        }

    }
}