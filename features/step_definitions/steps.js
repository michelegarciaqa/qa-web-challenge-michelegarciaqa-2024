import { AfterAll, BeforeAll, Given, Then, When } from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'
import { HomePage } from '../pages/index.js'

let driver
let homePage

BeforeAll(async () => {
    const options = new chrome.Options().addArguments()
    driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build()

    await driver.manage().setTimeouts({ implicit: 200000 })
})

AfterAll(async () => {
    await driver.quit()
})

Given('I navigate to the Ryanair website', async () => {
    await driver.get('https://www.ryanair.com/ie/en')
    homePage = new HomePage(driver)
})

When(
    'I search for a flight from {string} to {string}',
    async (departure, destination) => {
        await homePage.acceptCookies()

        await homePage.selectFlight(departure, destination)
        await homePage.selectDate('2024-02-22', '2024-02-24')
    },
)

Then('a login popup shows up before payment', async () => {
    // Implementation of the check for the login popup goes here
})
