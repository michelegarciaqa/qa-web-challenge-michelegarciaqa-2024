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
        this.doneButton = By.css('aria-label="Done"') 
        this.adultsSelector = (adultsNumber) => By.css(`[data-ref="input-button__display-value"]:contains('${adultsNumber} Adult')`)
        this.searchButton = By.css('aria-label="Search"')
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
            100000,
        )

        await this.driver.findElement(this.dateSelector(startDate)).click()
        await this.driver.findElement(this.datesToSelector).click()
        await this.driver.findElement(this.dateSelector(endDate)).click()

        // await this.driver.wait(until.elementsLocated(this.doneButton), 100000)
        // await this.driver.findElement(this.doneButton).click()
        await this.driver.findElement(this.searchButton).click()
    }

    async selectPassengers(adultsNumber){    
        await this.driver.wait(
            until.elementsLocated(this.adultsSelector(adultsNumber)),
            100000,
        )
        await this.driver.findElement(this.adultsSelector(adultsNumber)).click();
        await this.driver.findElement(this.searchButton).click();
} 
}
