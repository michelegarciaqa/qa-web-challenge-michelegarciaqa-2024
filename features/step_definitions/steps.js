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
    homePage = new HomePage(driver)
    await homePage.open();
})

When(
    'I search for a flight from {string} to {string} on {string} for 2 Adults, 1 Child', { timeout: 6 * 5000 },
    async (departure, destination, startDate) => {
        await homePage.acceptCookies()
        await homePage.selectDestination(departure, destination)
        await homePage.selectDate(startDate)
        await homePage.selectTheFlight()
        await homePage.passengersInfo(
            'Mr', 'Name one', 'Surname', 'Ms', 'Name two', 'Surname', 'Name Child', 'Surname')
    })

When('I select seats for all passengers', { timeout: 2 * 10000  }, async () => {
    await homePage.selectSeats();
})

When('I add a 20kg bag for each passenger', { timeout: 5 * 10000 }, async () => {
    await homePage.selectBags();
})

Then('a login popup shows up before payment', { timeout: 2 * 10000 }, async () => {
    await homePage.validateLoginPopup()
})
