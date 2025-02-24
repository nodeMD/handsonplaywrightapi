![example workflow](https://github.com/nodeMD/handsonplaywrightapi/actions/workflows/playwright.yml/badge.svg)

Playwright E2E API tests
for `https://restful-booker.herokuapp.com` API

Two tests are SKIPPED cause there is a bug in the app. The server is not prepared for a request with wrong types for parameters and throws Internal Server Error. 

# Quick start guide:
install all dependencies:
`yarn`

set environmental variables:
1. create `.env` file in main directory
2. copy content of `.env.example` to `.env` file
3. fill **all** the variables with data (you can find the values on `https://restful-booker.herokuapp.com/apidoc/index.html` website)

start all tests:
`yarn test`

format tests code:
`yarn format`

check test code linting:
`yarn lint`

fix test code linting:
`yarn lint-fix`

# To setup github actions
open your repository `Settings`
then click on `Secrets` -> `Actions`
next click button `New repository secret` and
add secrets for **all** environmental variables from `.env.example` file

FYI: Two tests in createBooking.spec.ts are skipped cause of bugs in the API