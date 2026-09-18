# Mini E-Commerce

A small e-commerce application built with HTML, CSS, and vanilla JavaScript.

The application allows users to browse products, search and filter the catalog, add products to a cart, update quantities, and complete a simulated checkout.

## Features

* Product catalog
* Search products
* Filter products by category
* Sort products by price and name
* Add products to cart
* Increase and decrease quantities
* Remove products from cart
* Calculate subtotal, shipping, tax, and total
* Persist cart data with `localStorage`
* Display cart item count
* Empty cart handling
* Checkout form
* Form validation
* Simulated checkout
* Responsive layout

## Concepts Demonstrated

* Arrays and objects
* Functions
* Array methods
* `map()`
* `filter()`
* `find()`
* `reduce()`
* `sort()`
* Destructuring
* Spread syntax
* Template literals
* DOM manipulation
* Event handling
* Event delegation
* Form handling
* Local Storage
* JSON
* Number formatting
* State management
* Conditional rendering
* Error handling

## Project Structure

```text
06-mini-ecommerce/
├── README.md
├── index.html
├── style.css
└── app.js
```

## Running the Project

Use a local development server.

For example:

```bash
npx serve .
```

Then open the provided local URL in your browser.

## Data

Product data is stored locally in `app.js`.

No external database or payment provider is used.

The checkout process is simulated and does not process real payments.

## Learning Goal

The goal of this project is to demonstrate how multiple JavaScript concepts can be combined to build a larger browser application with multiple UI states, persistent data, derived values, filtering, sorting, cart management, and form handling.

The project intentionally uses vanilla JavaScript so the application logic remains visible and easy to study.
