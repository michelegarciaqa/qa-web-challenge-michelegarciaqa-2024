import { By, until } from 'selenium-webdriver'

export class HomePage {
    constructor(driver) {
        this.driver = driver
        this.url = 'https://www.ryanair.com/ie/en';
        this.driver.manage().window().maximize();
        this.departureAirportSelector = By.id('input-button__departure')
        this.destinationAirportSelector = By.id('input-button__destination')
        this.searchButton = By.css('[data-ref="flight-search-widget__cta"]')
        this.acceptCookiesBtnSelector = By.css('[data-ref="cookie.accept-all"]')
        this.oneWaySelector = By.xpath('//*[contains(text(), "One way")]')
        //the way so I can choose a date
        this.chooseDaySelector = By.xpath(
            '//*[contains(text(), "Choose date")]',
        )
        this.datesFromSelector = By.css(
            '[data-ref="input-button__display-value"]',
        )
        this.datesToSelector = By.css('[uniqueid="dates-to"]')
        this.dateSelector = (date) => By.css(`[data-id="${date}"]`)
        this.adultSelector = By.css('aria-label="1Adults+1"')
        this.doneButton = By.xpath('//*[contains(text(), "Done")]')
        this.selectButton = By.xpath('(//*[contains(text(), "Select")])[1]')
        this.basicFareSelector = By.xpath('(//*[contains(text(), "Travel light")])')
    }

    async open() {
        await this.driver.get(this.url);
    }

    async acceptCookies() {
        const acceptCookiesBtn = await this.driver.findElement(
            this.acceptCookiesBtnSelector,
        )
        await acceptCookiesBtn.click()
    }

    async selectFlight(departure, destination) {
        await this.driver.findElement(this.oneWaySelector).click()

        await this.driver.findElement(this.destinationAirportSelector).click()
        await this.driver
            .findElement(this.destinationAirportSelector)
            .sendKeys(destination)

        await this.driver.findElement(By.css('[data-id="STN"]')).click() //to choose London Stansted 
    }

    async selectDate(startDate, endDate) {
        await this.driver.findElement(this.chooseDaySelector).click()

        await this.driver.wait(
            until.elementsLocated(this.dateSelector(startDate)),
            5000,
        )

        await this.driver.findElement(this.dateSelector(startDate)).click()
        //in case i wanna put return dates
        //await this.driver.findElement(this.datesToSelector).click()
        //await this.driver.findElement(this.dateSelector(endDate)).click()
        await this.driver.wait(until.elementsLocated(this.doneButton), 5000)
        await this.driver.findElement(this.doneButton).click()
        await this.driver.findElement(this.searchButton).click()
    }

    async selectTheFlight() {
        await this.driver.findElement(this.selectButton).click();
        // Wait for the element to be present in the DOM
        await this.driver.wait(until.elementLocated(this.basicFareSelector), 10000);
        // Scroll the element into view
        const element = await this.driver.findElement(this.basicFareSelector);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);

        // Click on the element using JavaScript
        await this.driver.executeScript("arguments[0].click();", element);
    }
}
