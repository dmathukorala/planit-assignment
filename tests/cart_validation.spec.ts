import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ShopPage } from "../pages/ShopPage";
import { CartPage } from "../pages/CartPage";

test("Verify cart totals", async ({ page }) => {
    const homePage = new HomePage(page);
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Navigate to home page and go to contact page
    await homePage.navigate("http://jupiter.cloud.planittesting.com");
    await homePage.goToShopPage();

    //Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
    await shopPage.addProductToCart("Stuffed Frog", 2);
    await shopPage.addProductToCart("Fluffy Bunny", 5);
    await shopPage.addProductToCart("Valentine Bear", 3);

    //Go to the cart page
    await homePage.goToCartPage();

    //Verify the subtotal for each product is correct
    await cartPage.validateProductSubtotal("Stuffed Frog", 2);
    await cartPage.validateProductSubtotal("Fluffy Bunny", 5);
    await cartPage.validateProductSubtotal("Valentine Bear", 3);

    //Verify the price for each product
    await cartPage.validateProductPrice("Stuffed Frog", 10.99);
    await cartPage.validateProductPrice("Fluffy Bunny", 9.99);
    await cartPage.validateProductPrice("Valentine Bear", 14.99);

    //Verify that total = sum(sub totals)
    await cartPage.validateTotalPrice();

});