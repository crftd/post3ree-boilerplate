import 'chromedriver';
import seleniumWebdriver from 'selenium-webdriver';
import { defineSupportCode } from 'cucumber';

function CustomWorld() {
  const chromCapabilities = seleniumWebdriver.Capabilities.chrome();
  const chromeOptions = { args: ['--incognito', '--disable-background-timer-throttling', '--disable-extensions'] };
  chromCapabilities.set('chromeOptions', chromeOptions);
  this.driver = new seleniumWebdriver.Builder()
    .withCapabilities(chromCapabilities)
    .build();
  // Returns a promise that resolves to the element
  this.waitForElement = function (locator) {
    const condition = seleniumWebdriver.until.elementLocated(locator);
    return this.driver.wait(condition);
  };
}

defineSupportCode(({ setWorldConstructor }) => {
  setWorldConstructor(CustomWorld);
});
