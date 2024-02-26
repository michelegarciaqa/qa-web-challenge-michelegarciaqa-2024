# Automated Testing with JavaScript and Selenium WebDriver

## Overview

The project includes a HomePage class that encapsulates the functionality of the Ryanair homepage. It provides methods for interacting with various elements on the webpage, such as selecting airports, dates, and flights, as well as handling popups and other UI elements.

## Usage

To use the automated testing functionality provided by this project, follow these steps:

1. **Set Up Environment**:
   - Ensure that you have Node.js and npm installed on your system.

2. **Install Dependencies**:
   - Run `npm install` to install the required dependencies, including Selenium WebDriver.

3. **To run tests**:
    - Run `npm run test` to run the tests.


- `open()`: Navigates to the Ryanair homepage.
- `acceptCookies()`: Accepts cookies on the webpage.
- `selectFlight(departure, destination)`: Selects departure and destination airports.
- `selectDate(startDate, endDate)`: Chooses travel dates and passenger details.
- `selectTheFlight()`: Selects a flight and proceeds with booking.
- `passengers()`: Provides passenger information and continues with the booking process.
- `validateLoginPopup()`: Verifies the appearance of a login popup with expected text.

### Explanation of Code Section

The following code snippet is responsible for ensuring that the "Continue" button is clickable only after the basket has been updated with a new value. This was necessary because simply using a wait mechanism wasn't effective due to certain timing issues.

```javascript
let initialElement = await this.driver.findElement(this.basket);
let initialValue = await initialElement.getText();

// Wait until the element changes
await this.driver.wait(async () => {
    let updatedElement = await this.driver.findElement(this.basket);
    let updatedValue = await updatedElement.getText();
    
    // Check if the current value is different from the initial value
    return updatedValue !== initialValue;
}, 10000);
