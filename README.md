# qa-web-challenge
## Requirements
- Please automate a test to search for a flight, select VALUE/BASIC fare, skip login after fare select, navigate through extras pages selecting seats and 20kg bags and verify a login popup is displayed before payment on https://www.ryanair.com/ie/en/
- Use any one of the following languages:
  - JavaScript (selenium-webdriver) - preferred
  - Java
  - Python
- Use Page Object Pattern
- Give some documentation on why you chose what you did and documentation on how to run these tests
- Show reporting for your results
- We are fans of BDD and Cucumber in Ryanair, use these if you can
- Use all your testing and programming skills to prove your knowledge & ability

## Example test input
```
Given I search for a flight from "DUB" to "STN" on 12/01/2023 for 2 adults and 1 child
When I proceed to pay with selected seats and 20kg bags added
Then login popup shows up
```
