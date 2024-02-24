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



