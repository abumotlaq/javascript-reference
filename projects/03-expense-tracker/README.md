# Expense Tracker

A personal expense tracking application built with HTML, CSS, and vanilla JavaScript.

The application allows users to record income and expenses, organize transactions by category, filter records, and view a financial summary.

## Features

* Add income transactions
* Add expense transactions
* Select transaction categories
* Delete transactions
* Filter transactions by type
* Display total balance
* Display total income
* Display total expenses
* Display transaction count
* Persist transactions with `localStorage`
* Validate transaction input
* Handle invalid stored data
* Format currency values
* Responsive layout

## Concepts Demonstrated

* Variables and constants
* Objects and arrays
* Functions
* Array methods
* `map()`
* `filter()`
* `reduce()`
* Destructuring
* Template literals
* DOM manipulation
* Event handling
* Form handling
* Event delegation
* JSON
* Local Storage
* Number formatting
* Date handling
* Error handling

## Project Structure

```text
03-expense-tracker/
├── README.md
├── index.html
├── style.css
└── app.js
```

## Running the Project

Open the project with a local development server.

For example:

```bash
npx serve .
```

## Data Storage

Transactions are stored in the browser using `localStorage`.

The application serializes transaction data with `JSON.stringify()` and restores it with `JSON.parse()`.

## Learning Goal

The goal of this project is to demonstrate how JavaScript can manage structured application data, perform calculations, update the DOM, and persist state in a browser environment.
