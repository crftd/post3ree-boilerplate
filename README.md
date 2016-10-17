# post3ree-boilerplate
Boilerplate for NodeJS universal application using 3REE stack + PostCSS

## Requires RethinkDB

All we need is (p)love. [Plove is here](https://www.rethinkdb.com/docs/install/ubuntu/)  

Now start RethinkDB bitch  

![Pinkman](https://pbs.twimg.com/profile_images/3628798662/6b689ec272f472cd0241a04183390b62.jpeg)

`$ rethinkdb`

This will create a directory with db-files and start RethinkDB server. DB dashboard will be available at [localhost:8080](http://localhost:8080)

## App

`$ npm i`  

`$ npm run start`

## Testing
### BDD
We are using [cucumber-js](https://github.com/cucumber/cucumber-js) for BDD.

You will probably want to install [forever](https://github.com/foreverjs/forever) first

`npm i -g  forever`

Then run test

`npm run test:cucumber`