<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="asabik-logo.svg" width="400" alt="Nest Logo" /></a>
</p>

## Asabik Back-end - back-end service for invest app

Simple backend for invest app created with Node.js (TypeScript) and Postgres.

## Table of Contents

---

- [Technologies](#technologies)
- [Setup](#Setup)
- [Test](#technologies)

## Technologies

- Node.js 18
- NestJS 9
- Postgres 15
- TypeORM 0.3
- Jest 28
- RxJs 7

## Database Setup

In your PostgreSQL database, create database named 'asabik'. Default password is 'password'. If you choose different one when creating your database, you'll need to change it database.config.ts file, as well as other data regarding database.

## ENV File Setup

Create an .env file in ../asabik-backend folder basing on .env.template file. In there you need to provide:

- PLAID_CLIENT_ID and PLAID_SECRET from [Plaid](https://dashboard.plaid.com). In the place of PLAID_SECRET please insert your sandbox key frmo Plaid.
- for emails to work properly, you'll need to setup SMTP Server, for example [MailDev](https://github.com/maildev/maildev). You don't need to alter MAIL_PORT when using MailDev.

## Setup

To run this app, install it localy using npm.

```bash
$ npm install
```

Then setup config file .env following the template in .env.template
and database config file in database.config.ts

After setup config files you have to update database with typeorm

```bash
$ npm run typeorm:run
```

now you can run app:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
