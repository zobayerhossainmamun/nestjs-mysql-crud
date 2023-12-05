<div align="center">
  <h2>Simple CRUD Application with nestjs</h2>
</div>

  <p align="center">This application refers to a basic software system built using the NestJS framework to perform CRUD operations (Create, Read, Update, Delete) on data.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

</p>

## Description

In this application, you can create new data entries, retrieve existing ones, update their information, and delete records—all through a straightforward and structured API created with NestJS. 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running on Docker

```bash
# Create network
$ docker network create nestcrud_network

# Development
$ docker-compose -f docker-compose.yml --env-file .env.development up --build -d

# Production
$ docker-compose -f docker-compose.yml --env-file .env.production up --build -d
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