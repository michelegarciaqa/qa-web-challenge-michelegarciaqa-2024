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
        this.chooseDaySelector = By.xpath('//*[contains(text(), "Choose date")]',)
        this.datesFromSelector = By.css('[data-ref="input-button__display-value"]',)
        this.datesToSelector = By.css('[uniqueid="dates-to"]')
        this.dateSelector = (date) => By.css(`[data-id="${date}"]`)
        this.adultSelector = By.css('aria-label="1Adults+1"')
        this.doneButton = By.xpath('//*[contains(text(), "Done")]')
        this.selectButton = By.xpath('(//*[contains(text(), "Select")])[1]')
        this.basicFareSelector = By.xpath('//fare-table-new-layout-container//thead/tr/th[2]/div')
        this.basicFareButtonLocator = By.xpath("//button[@data-e2e='value']")
        this.logInLaterButton = By.xpath('//span[contains(text(), "Log in later")]')
        this.tittleDropDownAdult1 = By.xpath('//pax-passenger-container[1]//ry-dropdown/div[2]/button/icon/span')
        this.tittleDropDownAdult2 = By.xpath('//pax-passenger-container[2]//ry-dropdown/div[2]/button/icon/span')
        this.tittleSelectorAdult1 = By.xpath('//*[contains(text(), "Ms")]')
        this.tittleSelectorAdult2 = By.xpath('//*[contains(text(), "Mr")]')
        this.firstNameAdult1 = By.id('form.passengers.ADT-0.name')
        this.lastNameAdult1 = By.id('form.passengers.ADT-0.surname')
        this.firstNameAdult2 = By.id('form.passengers.ADT-1.name')
        this.lastNameAdult2 = By.id('form.passengers.ADT-1.surname')
        this.continueButton = By.xpath('//*[contains(text(), "Continue")]')
        this.firstNameChild = By.id('form.passengers.CHD-0.name')
        this.lastNameChild = By.id('form.passengers.CHD-0.surname')
        this.okayGotItButton = By.xpath('//*[contains(text(), " Okay, got it.")]')
        this.recommendedButton = By.xpath(`//button[contains(text(),"Add recommended seats")]`)
        this.noFastTrackButton = By.xpath(`//button[contains(@data-ref,"dismiss-cta")]`)
        this.smallBagSelector = By.xpath('//bags-product-selector//ry-radio-circle-button/label');
        this.bigBagSelector = By.xpath('//bags-checkin-bag-table-controls/div[2]/bags-table-row-cta/span')
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

    async selectDestination(departure, destination) {
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
            until.elementLocated(this.dateSelector(startDate)),
            5000,
        )

        await this.driver.findElement(this.dateSelector(startDate)).click()

        //in case i wanna put return dates
        //await this.driver.findElement(this.datesToSelector).click()
        //await this.driver.findElement(this.dateSelector(endDate)).click()

        const increaseAdultButtonLocator = By.xpath(
            "//ry-counter-button[contains(@aria-label, 'Adults+1')]/parent::div"
        );
        const increaseAdultButton = await this.driver.wait(
            until.elementLocated(increaseAdultButtonLocator),
            10000
        );
        await this.driver.wait(until.elementIsVisible(increaseAdultButton))
        await increaseAdultButton.click();

        const increaseChildrenButtonLocator = By.xpath(
            "//ry-counter-button[contains(@aria-label, 'Children+1')]/parent::div"
        );
        const increaseChildrenButton = await this.driver.wait(
            until.elementLocated(increaseChildrenButtonLocator),
            10000
        );
        await this.driver.wait(until.elementIsVisible(increaseChildrenButton))
        await increaseChildrenButton.click();

        await this.driver.wait(until.elementsLocated(this.doneButton), 5000)
        await this.driver.findElement(this.doneButton).click()
        await this.driver.findElement(this.searchButton).click()
    }

    async selectTheFlight() {
        await this.driver.findElement(this.selectButton).click();
        // Wait for the element to be present 
        await this.driver.wait(until.elementLocated(this.basicFareSelector), 10000)
        // Scroll the element into view
        const element = await this.driver.findElement(this.basicFareSelector)
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element)
        // Click on the element using JavaScript
        await this.driver.executeScript("arguments[0].click();", element);
        await this.driver.wait(until.elementLocated(this.basicFareButtonLocator), 10000)
        await this.driver.findElement(this.basicFareButtonLocator).click()
        await this.driver.findElement(this.logInLaterButton).click()
    }

    async passengersInfo(adult1Title, adult1FirstName, adult1LastName, adult2Title, adult2FirstName, adult2LastName, childFirstName, childLastName) {
        await this.driver.findElement(this.tittleDropDownAdult1).click()
        await this.driver.findElement(this.tittleSelectorAdult1).click()
        await this.driver.findElement(this.firstNameAdult1).sendKeys(adult1FirstName)
        await this.driver.findElement(this.lastNameAdult1).sendKeys(adult1LastName)
        await this.driver.findElement(this.tittleDropDownAdult2).click()
        await this.driver.findElement(this.tittleSelectorAdult2).click()
        await this.driver.findElement(this.firstNameAdult2).sendKeys(adult2FirstName)
        await this.driver.findElement(this.lastNameAdult2).sendKeys(adult2LastName)
        await this.driver.findElement(this.firstNameChild).sendKeys(childFirstName)
        await this.driver.findElement(this.lastNameChild).sendKeys(childLastName)
        await this.driver.findElement(this.continueButton).click()
    }
    

    async selectSeats() {
        const okayGotItButton = await this.driver.wait(until.elementLocated(this.okayGotItButton), 10000)
        await this.driver.wait(until.elementIsVisible(okayGotItButton), 10000);
        await okayGotItButton.click();
        const button = await this.driver.wait(until.elementLocated(this.recommendedButton), 10000)
        await this.driver.executeScript("arguments[0].scrollIntoView()", button)
        await button.click();
        await this.driver.findElement(this.noFastTrackButton).click()
    }

    async selectBags() {
        await this.driver.findElement(this.smallBagSelector).click()
        await this.driver.findElement(this.bigBagSelector).click() 
        const continueWithBagsButtonLocator = By.xpath(
            `//button[@data-ref="bags-continue-button"]`
          );
          const continueWithBagsButton = await this.driver.wait(
            until.elementLocated(continueWithBagsButtonLocator),
            1000000
          );
          await this.driver.wait(until.elementIsVisible(continueWithBagsButton));
          await continueWithBagsButton.click();
 }

    async validateLoginPopup() {
        await this.driver.wait(until.elementLocated(this.loginPopup), 10000)
        // Get the element
        const element = await this.driver.findElement(this.loginPopup)
        // Get the text of the element
        const actualText = await element.getText();
        // Expected text
        const expectedText = "Make it simple with myRyanair"
        // Log the actual and expected text
        console.log("Actual text:", actualText)
        console.log("Expected text:", expectedText)
        // Compare the actual text with the expected text
        if (actualText === expectedText) {
            console.log("The login popup with the expected text appeared.")
        } else {
            console.log("The login popup with the expected text did not appear.")
        }
    }
}