Playwright E2E API tests
for `https://restful-booker.herokuapp.com` API

# Quick start guide:
install all dependencies:
`yarn`

set environmental variables:
1. create `.env` file in main directory
2. copy content of `.env.example` to `.env` file
3. fill **all** the variables with data

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