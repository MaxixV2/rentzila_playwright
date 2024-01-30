# DESCRIPTION
This is a project for automated testing of Rentzila website using Playwright
## REQUIREMENTS:
- Node.js
## INSTALLATION:
1. Clone this repository
2. Install dependencies:
```
npm install
```
## Launch
To run tests specified in spec.js files use:
```
npx playwright test
```

Use `npx playwrite test filename.spec.js` to run a specific test

For example:
```
npx playwright test login-hf.spec.js
```
To run tests in headed mode use flag `--headed` 
```
npx playwright test --headed
```
