# GitHub User Search

A GitHub profile search application built with HTML, CSS, and vanilla JavaScript.

The application retrieves public GitHub user information and displays profile details together with recently updated repositories.

## Features

* Search GitHub users by username
* Display profile avatar
* Display name and username
* Display bio
* Display location and company
* Display follower and following counts
* Display public repository count
* Display recent repositories
* Display repository stars, forks, and primary language
* Open GitHub profiles and repositories
* Handle loading states
* Handle API errors
* Cancel outdated requests
* Restore the last searched username
* Responsive layout

## APIs Used

The project uses the GitHub REST API:

* Get a user
* List repositories for a user

Public resources are requested without authentication.

## Concepts Demonstrated

* Objects and arrays
* Destructuring
* Functions
* Array methods
* `map()`
* `filter()`
* `sort()`
* `Promise.all()`
* `async/await`
* `fetch()`
* `AbortController`
* `URLSearchParams`
* DOM manipulation
* Event handling
* Dynamic rendering
* Local Storage
* Error handling
* HTTP status handling

## Project Structure

```text
05-github-user-search/
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

## API Notes

The application requests public GitHub data from:

```text
https://api.github.com/users/{username}
https://api.github.com/users/{username}/repos
```

GitHub recommends sending the `Accept: application/vnd.github+json` header and supports explicit REST API version headers.

## Learning Goal

The goal of this project is to demonstrate how a browser application can consume a real REST API, coordinate multiple asynchronous requests, handle failures, cancel outdated requests, and render structured remote data dynamically.
