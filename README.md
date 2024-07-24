# Yamid Granda - Alegra Take Home Challenge

Check the 👉👉👉 DEMO Video Here 👈👈👈

![Architecture Diagram](https://lh3.googleusercontent.com/drive-viewer/AKGpihZf3lPZVRjxT8PPpsbQuFLfR9ai6zbEaeXpznmgN_okhdJmsXPzA3UWebkdBn8bS0pbSxpks7QcFDn6eXhHV_eQaNOAJ4jlwxY=w3456-h1996-rw-v1 "Architecture Diagram")

## Requirements

- `nodejs 20` or higher
- `pnpm` (recommended, optional) [check the official pnpm installation guide here](https://pnpm.io/installation)

## Dependencies Installation

- Using `pnpm` monorepo (recommended): `pnpm install` or `pnpm i`, this will install all workspaces dependencies (`ui` & `api`)
- (Alternative) Using `npm`:
  - go to the ui folder `cd ./ui` and run `npm install`
  - go to the api folder `cd ./api` and run `npm install`

## Workflow

- Run `ui` Dev environment: `pnpm -F ui dev` or go to the `./ui` folder and run `npm run dev`
- Run `ui` TDD (Test Driven Development) environment: `pnpm -F ui test` or go to the `./ui` folder and run `npm run test`
- Run `api` Dev environment: `pnpm -F api dev` (AWS account config is required) or go to the `./api` folder and run `npm run dev`
- Run `api` TDD (Test Driven Development) environment: `pnpm -F api test` or go to the `./api` folder and run `npm run test`

### UI Deployment Requirements

1. Config AWS CLI, [check here the official guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
2. Run `pnpm -F ui deploy:production` or go to the `./ui` folder and run `npm run deploy:production`

### API Deployment Requirements

1. Config AWS CLI, [check here the official guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
2. Install jq `brew install jq`, (this allows bind the environment variables)
3. Install AWS SAM (Serverless Application Model) CLI [check here the official guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
4. Run `pnpm -F api deploy:production` or go to the `./api` folder and run `npm run deploy:production`
