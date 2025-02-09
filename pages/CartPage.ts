import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import { expect } from '@playwright/test';

export class CartPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async validateProductSubtotal(productName: string, quantity: number) {
        const priceText = await this.page.locator(`tr:has-text("${productName}") td:nth-child(2)`).textContent();
        const price = parseFloat(priceText!.replace("$", "").trim());

        const expectedSubtotal = price * quantity;

        const subtotalText = await this.page.locator(`tr:has-text("${productName}") td:nth-child(4)`).textContent();
        const actualSubtotal = parseFloat(subtotalText!.replace("$", "").trim());

        expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
    }

    async validateProductPrice(productName: string, expectedPrice: number) {
        const priceText = await this.page.locator(`tr:has-text("${productName}") td:nth-child(2)`).textContent();
        const price = parseFloat(priceText!.replace("$", "").trim());

        expect(price).toBeCloseTo(expectedPrice, 2);
    }

    async validateTotalPrice() {
        const totalPriceText = await this.page.locator('tr:has-text("Total:") .total').textContent();

        const actualTotalPrice = parseFloat(totalPriceText!.replace("Total: ", "").trim());

        const expectedTotalPrice = await this.calculateExpectedTotalPrice();

        expect(actualTotalPrice).toBeCloseTo(expectedTotalPrice, 2);
    }

    async calculateExpectedTotalPrice(): Promise<number> {
        let total = 0;

        const rows = await this.page.locator('tr.ng-scope').all();

        for (const row of rows) {
            const priceText = await row.locator('td:nth-child(2)').textContent();
            const price = parseFloat(priceText!.replace('$', '').trim());

            const quantityText = await row.locator('input[name="quantity"]').inputValue();
            const quantity = parseInt(quantityText, 10);

            total += price * quantity;
        }

        return total;
    }

}