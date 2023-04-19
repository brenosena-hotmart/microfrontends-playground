# Microfrontends Playground

Repository created to apply and fix the concepts of microfrontends

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `root`: a react app
- `app1`: a vanilla app
- `app1`: another react app
- `eslint-config-custom`: shared `eslint` configurations
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

## Installation

- Download and install [NodeJS and NPM](http://nodejs.org);
- Install [PNPM](https://pnpm.io/pt/)

### NodeJS & NPM

Make sure you are using the correct [node version](.nvmrc) by running `node -v`

You might need to switch the current node version in use. To easily switch between node versions, install [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) and run:

```sh
nvm use 16
```

#### PNPM

```sh
npm install -g pnpm
```

Install the project dependencies

```sh
$ pnpm install
```

## Running

Running in development mode

```sh
pnpm run dev
```

To perform communication between the root application and an iframe you need to open chrome with the security flag disabled by running the following command in terminal

```sh
open -na Google Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security
```

For the root application to be able to consume the app2 package via module federation it is necessary to generate the app2 bundle

```sh
cd apps/app2
pnpm run build
```
