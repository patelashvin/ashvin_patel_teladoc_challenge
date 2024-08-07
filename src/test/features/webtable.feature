Feature: Webtable Page

  As an Engr. Candidate
  I need to automate http://www.way2automation.com/angularjs-protractor/webtables/
  So that I can show my awesome automation skills

  Background:
    Given I am on the 'webtable' page

  @Smoke
  Scenario Outline: Add a user to the webtable page
    When I add a user with the following details:
      | firstName   | lastName   | userName   | role   | email   | cellPhone   |
      | <firstName> | <lastName> | <userName> | <role> | <email> | <cellPhone> |
    Then I should see "<userName>" on the webtable

    Examples:
      | firstName | lastName | userName | role     | email         | cellPhone    |
      | John      | Doe      | doeJ     | Customer | jd@gmail.com  | 555-222-3333 |

  @Smoke @Delete
  Scenario: Delete a user from the webtable page
    When I delete 'novak' user from the webtable
    Then I should not see 'novak' on the webtable