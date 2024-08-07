import { Locator, Page } from "@playwright/test";

export class DeleteConfirmModal {
    readonly page: Page
    readonly okBtn: Locator
    readonly cancelBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.okBtn = this.page.locator('xpath=.//button[contains(.,"OK")]')
        this.cancelBtn = this.page.locator('xpath=.//button[contains(.,"Cancel")]')
    }
}