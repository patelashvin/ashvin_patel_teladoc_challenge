import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';
import { WebtablePage } from '../../pageObject/pages/webtable.po';
import { userData } from "../../pageObject/modals/add-user.modal";

setDefaultTimeout(60 * 1000 * 2);

Given('I am on the {string} page', async(page: string) => {
    if(page === 'webtable') {
        const webtablePage = new WebtablePage(pageFixture.page)
        await pageFixture.page.goto('https://www.way2automation.com/angularjs-protractor/webtables/');
        await webtablePage.tableDataCell.first().waitFor({state: 'visible'})
        return
    }
    throw new Error(`URL ${page} is not a valid url`)
});

When('I add a user with the following details:', async(dataTable) => {
      const userData = dataTable.hashes()[0];
      const webtablePage = new WebtablePage(pageFixture.page)
      await webtablePage.addUser(userData)
});

Then('I should see {string} on the webtable', async(userData) => {
     const webtablePage = new WebtablePage(pageFixture.page)
     const allRowValues = await webtablePage.tableDataCell.allTextContents()
     expect(allRowValues.includes(userData)).toBeTruthy()
});


When('I delete {string} user from the webtable', async(user) => {
      const webtablePage = new WebtablePage(pageFixture.page)
      await webtablePage.delUser(user)
});

Then('I should not see {string} on the webtable', async(userData) => {
     const webtablePage = new WebtablePage(pageFixture.page)
     const allRowValues = await webtablePage.tableDataCell.allTextContents()
     expect(allRowValues.includes(userData)).toBeFalsy()
});