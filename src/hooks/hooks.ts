import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
    // Launch Browser using Playwright and Chromium browser, performed once, before the start of all test scenarios.page

    browser = await chromium.launch({ headless: false });
});

AfterAll(async () => {
    // Closes Browser before the start of each scenario'

    await browser.close();
});

Before(async () => {
    // Launch Browser, performed before each individual test scenario

    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async ({ pickle, result }) => {
    // Browser closed after each scenario, and result?.status');

    // screenshot
    if (result?.status == Status.FAILED) {
        await pageFixture.page.screenshot({
        path: `./test-results/screenshots/${pickle.name}.png`,
        type: 'png',
        });
    }
    await pageFixture.page.close();
    await context.close();
});
