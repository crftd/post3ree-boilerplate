Feature: Auth
  JWT based registration and auth

  Scenario: Sign Up
    Given John Doe opens Sign Up page
    When John Doe submits sign-up form with email: john.doe@example.com and password: qwerty1234
    Then John Doe redirected to Sign In page

  Scenario: Sign In
    Given John Doe opens Sign In page
    When John Doe submits sign-in form with email: john.doe@example.com and password: qwerty1234
    Then John Doe redirected to Home page
