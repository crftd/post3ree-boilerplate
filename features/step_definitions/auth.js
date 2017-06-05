import 'babel-polyfill';
import { defineSupportCode } from 'cucumber';
import { By } from 'selenium-webdriver';
import { assert } from 'chai';

defineSupportCode(({ Before, After, Then, When, Given }) => {
  let webDriver = null;

  Before(function () {
    webDriver = this.driver;
  });

  After(async () => {
    // await webDriver.quit();
  });

  Given(/^John Doe opens Sign Up page$/, async () => {
    await webDriver.get('http://localhost:3000/sign-up');
  });

  When(/^John Doe submits sign-up form with email: (.+) and password: (.+)$/, async (email, password) => {
    await webDriver
      .findElement(By.name('email'))
      .sendKeys(email);
    await webDriver
      .findElement(By.name('password'))
      .sendKeys(password);
    await webDriver
      .findElement(By.xpath('//button[text()="Sign up"]'))
      .click();
  });

  Then(/^John Doe redirected to Home page$/, async () => {
    const url = await webDriver.getCurrentUrl();
    assert.equal(url, 'http://localhost:3000/');
  });

  Given(/^John Doe opens Sign In page$/, async () => {
    await webDriver.get('http://localhost:3000/sign-in');
  });

  When(/^John Doe submits sign-in form with email: (.+) and password: (.+)$/, async (email, password) => {
    await webDriver
      .findElement(By.name('email'))
      .sendKeys(email);
    await webDriver
      .findElement(By.name('password'))
      .sendKeys(password);
    await webDriver
      .findElement(By.xpath('//button[text()="Sign in"]'))
      .click();
  });
});
