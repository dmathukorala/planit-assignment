import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class HomePage extends BasePage {
    private contactLink = "a[href$='contact']";
    private shopButton = "a.btn.btn-success.btn-large";
    private cartButton = "a[href='#/cart']";

    constructor(page: Page) {
        super(page);
    }

    async goToContactPage() {
        await this.page.click(this.contactLink);
    }

    async goToShopPage() {
        await this.page.click(this.shopButton);
    }

    async goToCartPage() {
        await this.page.click(this.cartButton);
    }
}