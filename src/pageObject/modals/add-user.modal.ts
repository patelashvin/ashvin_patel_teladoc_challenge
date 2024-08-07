import { Locator, Page } from "@playwright/test";

export type userData = {
    firstName: string,
    lastName?: string | undefined,
    userName?: string | undefined,
    password?: string | undefined,
    customer?: 'CompanyAA' | 'CompanyBB'
    role: 'Sales Team' | 'Customer' | 'Admin'
    email?: string | undefined,
    cellPhone?: string | undefined
}

export class AddUserModal {
    readonly page: Page
    readonly form: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly userName: Locator
    readonly password: Locator
    readonly companyAAA: Locator
    readonly companyBBB: Locator
    readonly cancelButton: Locator
    readonly saveButton: Locator
    readonly role: Locator
    readonly email: Locator
    readonly cellPhone: Locator

    constructor(page: Page) {
        this.page = page
        this.form = this.page.locator('xpath=.//form[@name="smartTableValidForm"]')
        this.firstName = this.page.locator('xpath=.//input[@name="FirstName"]')
        this.lastName = this.page.locator('xpath=.//input[@name="LastName"]')
        this.userName = this.page.locator('xpath=.//input[@name="UserName"]')
        this.password = this.page.locator('xpath=.//input[@name="Password"]')
        this.companyAAA = this.page.locator('xpath=.//label[contains(.,"Company AAA")]')
        this.companyBBB = this.page.locator('xpath=.//label[contains(.,"Company BBB")]')
        this.role = this.page.locator('xpath=.//select[@name="RoleId"]')
        this.email = this.page.locator('xpath=.//input[@name="Email"]')
        this.cellPhone = this.page.locator('xpath=.//input[@name="Mobilephone"]')
        this.cancelButton = this.page.locator('xpath=.//button[text()="Close"]')
        this.saveButton = this.page.locator('xpath=.//button[text()="Save"]')
    }

    async enterUserData(user: userData): Promise<void> {
        if(typeof user.firstName === 'undefined' || typeof user.role === 'undefined') {
            throw new Error('Required field(s): "firstName" and/or "role" is missing')
        }
        await this.firstName.type(user.firstName)
        await this.role.selectOption({label: user.role})
        if(user.lastName) await this.lastName.pressSequentially(user.lastName)
        if(user.userName) await this.userName.pressSequentially(user.userName)
        if(user.password) await this.password.pressSequentially(user.password)
//         if(user.customer) await this.customer.pressSequentially(user.customer)
        if(user.email) await this.email.pressSequentially(user.email)
        if(user.cellPhone) await this.cellPhone.pressSequentially(user.cellPhone)
        // await this.page.pause()
        await this.saveButton.click()
    }
}