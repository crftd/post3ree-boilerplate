import 'babel-polyfill';
import { client } from 'nightwatch-cucumber';
import { defineSupportCode } from 'cucumber';

import config from 'config';

defineSupportCode(({ Then, When, Given }) => {
  const defaultVisibilityTimeout = 2 * 1000;
  const baseUrl = config.get('baseUrl');

  Given(/^John Doe opens Sign Up page$/, async () => {
    console.log(baseUrl);
    await client.url(`${baseUrl}/sign-up`);
    await client.waitForElementVisible('//*[text()[contains(.,"Sign Up")]]', defaultVisibilityTimeout);
  });

  Given(/^John Doe opens Sign In page$/, async () => {
    await client.url(`${baseUrl}/sign-in`);
    await client.waitForElementVisible('//*[text()[contains(.,"Sign In")]]', defaultVisibilityTimeout);
  });

  When(/^John Doe submits sign-up form with email: (.+) and password: (.+)$/, async (email, password) => {
    await client.setValue('//form/*/input[@name="email"]', email);
    await client.setValue('//form/*/input[@name="password"]', password);
    await client.click('//form/button[text()[contains(.,"Sign up")]]');
  });

  When(/^John Doe submits sign-in form with email: (.+) and password: (.+)$/, async (email, password) => {
    await client.setValue('//form/*/input[@name="email"]', email);
    await client.setValue('//form/*/input[@name="password"]', password);
    await client.click('//form/button[text()[contains(.,"Sign in")]]');
  });

  Then(/^John Doe redirected to Sign In page$/, async () => {
    await client.waitForElementVisible('//*[text()[contains(.,"Sign In")]]', defaultVisibilityTimeout);
    await client.assert.urlEquals(`${baseUrl}/sign-in`);
  });

  Then(/^John Doe redirected to Home page$/, async () => {
    await client.waitForElementVisible('//*[text()[contains(.,"Hello")]]', defaultVisibilityTimeout);
    await client.assert.urlEquals(`${baseUrl}/`);
  });
});
