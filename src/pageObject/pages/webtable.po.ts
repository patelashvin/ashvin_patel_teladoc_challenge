import { Locator, Page } from "@playwright/test";
import { AddUserModal, userData } from "../modals/add-user.modal";
import { DeleteConfirmModal } from "../modals/delete-confirm.modal";


export class WebtablePage {
    readonly page: Page
    readonly addBtn: Locator
    readonly tableDataCell: Locator
    readonly addUserModal: AddUserModal
    readonly deleteConfirmModal: DeleteConfirmModal

    constructor(page: Page) {
        this.page = page
        this.addUserModal = new AddUserModal(page)
        this.deleteConfirmModal = new DeleteConfirmModal(page)
        this.tableDataCell = this.page.locator('tbody tr td')
        this.addBtn = this.page.locator('xpath=.//button[contains(.,"Add User")]')

    }
    async goto(): Promise<void> {
        await this.page.goto('/angularjs-protractor/webtables/', { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('load')
    }
    async delUser(column: string): Promise<void> {
        const delBtn: Locator = this.page.locator(`xpath=.//*[contains(.,'${column}')]/following-sibling::*/button[contains(@ng-click,'delUser()')]`)
        await delBtn.click()
        await this.deleteConfirmModal.okBtn.click()
    }
    async addUser(user: userData): Promise<void> {
        await this.addBtn.click()
        await this.addUserModal.form.waitFor({state: 'visible'})
        await this.addUserModal.enterUserData(user)
    }
}