Feature: Order to production queue

  Scenario: Add Order to Production Queue
    Given I received order with ID "51234"
    When the production team adds it to the production queue
    Then the queue should contain "51234"
    And the order status should be "in production"
