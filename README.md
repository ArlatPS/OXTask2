# Task2 - Przemysław Sulich

## The program is implemented in TypeScript and is designed to run in Node.JS environment

- index.ts - function for logging output of the task functions
- task1.ts - functions for fetching data from the API
- task2.ts - function that creates an object with product categories as keys and total value of products as values
- task3.ts
  - function that iterates through carts from the API and finds the highestValueCart and then returns its value and user's full name
  - implementations of two helper functions (findElementWithId and getUserFullName) are also in this file
- task4.ts - fucntion that iterates through unique users pairs and finds two users living furthest away

## Running the program
- user first needs to install dependencies `npm i`
- program can be executed by `npm start` (this script first runs TypeScript compiler and then executes index.js created by the compilator)

## Testing is implemented in Jest and unit tests are located in tests folder (test suite can be run by `npm test`)
