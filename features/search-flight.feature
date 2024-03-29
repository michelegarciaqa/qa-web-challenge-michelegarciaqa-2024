Feature: Ryanair flight search

Scenario: Search for a flight from Dublin to London
  Given I navigate to the Ryanair website
  When I search for a flight from "Dublin" to "London" on "2024-03-24" for 2 Adults, 1 Child
  And I select seats for all passengers
  And I add a 20kg bag for each passenger
  Then a login popup shows up before payment
