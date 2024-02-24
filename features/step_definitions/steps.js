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

    await driver.manage().setTimeouts({ implicit: 100000, })
})

AfterAll(async () => {
    await driver.quit()
})

Given('I navigate to the Ryanair website', async () => {
    // await driver.get('https://www.ryanair.com/ie/en')
    homePage = new HomePage(driver)
    await homePage.open();
})

When(
    'I search for a flight from {string} to {string} on {string} for 2 Adultos', { timeout: 8 * 5000 },
    async (departure, destination, startDate) => {
        await homePage.acceptCookies()
        await homePage.selectFlight(departure, destination)
        await homePage.selectDate(startDate)
        await homePage.selectTheFlight()
        await homePage.passengers()
    })

Then('a login popup shows up before payment', async () => {
    await homePage.validateLoginPopup()
})
