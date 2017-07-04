# post3ree-boilerplate
[![Build Status](https://travis-ci.org/hex22a/post3ree-boilerplate.svg?branch=master)](https://travis-ci.org/hex22a/post3ree-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/hex22a/post3ree-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/hex22a/post3ree-boilerplate?branch=master)

![Cover](https://pp.vk.me/c837625/v837625764/1f1fc/p-DfkiSI8SE.jpg)

Boilerplate for NodeJS universal application using 3REE stack + PostCSS

## Requires RethinkDB

First of all start your DB and set connect to it (app/db/services.js).
By default we use [RethinkDB]((https://www.rethinkdb.com/docs/install/ubuntu/)).

<!-- ![Pinkman](https://pbs.twimg.com/profile_images/3628798662/6b689ec272f472cd0241a04183390b62.jpeg) -->

`$ rethinkdb`

This will create a directory with db-files and start RethinkDB server.
DB dashboard will be available at [localhost:8080](http://localhost:8080)

## App

`$ npm i` 

`$ npm start`

## Testing
### BDD
We are using [nightwatch-cucumber](https://github.com/mucsi96/nightwatch-cucumber) with [cucumber-js](https://github.com/cucumber/cucumber-js) for BDD.

Then run test

`npm run test:platform:dev` - run platform tests in develop environment
